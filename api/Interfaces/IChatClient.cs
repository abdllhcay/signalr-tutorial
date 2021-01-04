using SignalRApi.Models;
using System.Threading.Tasks;

namespace SignalRApi.Interfaces
{
    public interface IChatClient
    {
        Task ReceiveMessage(ChatMessage message);
        Task SendNotification(string message, string connectionId);
    }
}
