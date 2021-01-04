using Microsoft.AspNetCore.SignalR;
using SignalRApi.Interfaces;
using SignalRApi.Models;
using System.IO;
using System.Threading.Tasks;

namespace SignalRApi.Hubs
{
    public class ChatHub : Hub
    {
        //public async Task SendMessage(ChatMessage message)
        //{
        //    await Clients.All.ReceiveMessage(message);
        //}

        //public void SendConnectionId(string connectionId)
        //{
        //    File.WriteAllText(@"C:\temp\csc.txt", connectionId);
        //}

        public async Task SendNotification(string message, string connectionId)
        {
            await Clients.Client(connectionId).SendAsync("receivenotification", message);
        }

        public string GetConnectionId()
        {
            return Context.ConnectionId;
        }
    }
}
