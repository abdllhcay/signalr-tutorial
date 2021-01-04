using Microsoft.AspNetCore.SignalR;
using SignalRApi.Models;
using System.Threading.Tasks;

namespace SignalRApi.Hubs
{
    public class NotificationHub : Hub
    {
        // Trigger from client
        public async Task SendNotification(Notification notification)
        {
            await Clients.Client(notification.ConnectionId)
                .SendAsync("receivenotification", notification);
        }

        public string GetConnectionId()
        {
            return Context.ConnectionId;
        }
    }
}
