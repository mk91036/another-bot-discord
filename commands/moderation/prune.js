const commando = require ("discord.js-commando");

class PruneCommand extends commando.Command
{
    constructor(client)
    {
        super(client, {
            group: "moderation",
            name: "prune",
            memberName: "prune",
            description: "Prunes a given number of messages from a channel."
        });
    }

    async run (message, args)
    {
        // Determine if user has the correct permissions to delete messages.
        if (message.member.permissions.hasPermission ("ADMINISTRATOR"))
        {
            // Remove the command usage from the message.
            var content = message.content.replace("~prune ", "");

            // Check to see if the message contains a valid number.
            if(!isNaN(parseInt(content)))
            {
                // Retrieve the limit from the message fetch the number of messages.
                var limit = parseInt(content) + 1;
                var messagesCollection = await message.channel.fetchMessages({limit: limit});

                // Convert this collection to an array.
                var messages = messagesCollection.array();

                // Log that a series of messages have been deleted.
                DebugMessages(messages);

                // Bulk delete the retrieved messages.
                await message.channel.bulkDelete(messages);

                // Send the response to the user.
                await message.channel.startTyping ();
                var sentMessage = await message.channel.sendMessage ("Done!\n" + (limit - 1) + " messages were deleted senpai >///<");
                await message.channel.stopTyping (true);

                await sentMessage.delete(5000);

                return;
            }

            // Send the response to the user.
            await message.channel.startTyping ();
            var sentMessage = await message.channel.sendMessage ("Sorry! That's now how it works senpai. >.<\nOnly give me the number of messages you wish to delete.");
            await message.channel.stopTyping (true);

            await sentMessage.delete(5000);

            return;
        }

        // Send the response to the user.
        await message.channel.startTyping ();
        var sentMessage = await message.channel.sendMessage ("Yeah... You don't have the rights to do that.\nSorry senpai");
        await message.channel.stopTyping (true);

        await sentMessage.delete(5000);
    }
}

function DebugMessages (messages)
{
    var now = new Date();
    console.log(now.toLocaleString() + ": " + messages.length + " Messages were pruned.");
    console.log("These are the following messages that were pruned:\n");

    for(let i = 0; i < messages.length; i++)
        console.log(i + " - " + messages[i].content);
    
    console.log("");
}

module.exports = PruneCommand;