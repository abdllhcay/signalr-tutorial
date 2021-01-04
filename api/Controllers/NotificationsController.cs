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

        [HttpPost("all")]
        public async Task<IActionResult> SendAllClient([FromBody] Notification notification)
        {
            await this.hubContext.Clients.Client(notification.ConnectionId)
                .SendAsync("receivenotification", notification);

            return Ok();
        }
    }
}
