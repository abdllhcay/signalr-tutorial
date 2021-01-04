using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalRApi.Hubs;
using SignalRApi.Models;
using System.Threading.Tasks;

namespace SignalRApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        private IHubContext<NotificationHub> hubContext;

        public NotificationsController(IHubContext<NotificationHub> hubcontext)
        {
            this.hubContext = hubcontext;
        }

        [HttpPost]
        public async Task<IActionResult> SendToClient([FromBody] Notification notification)
        {
            await this.hubContext.Clients.Client(notification.ConnectionId)
                .SendAsync("receivenotification", notification);

            return Ok();
        }

        [HttpPost("all")]
        public async Task<IActionResult> SendAllClients([FromBody] Notification notification)
        {
            await this.hubContext.Clients.All
                .SendAsync("receivenotification", notification);

            return Ok();
        }
    }
}
