using System;
using Newtonsoft.Json;

namespace Microsoft.eShopOnContainers.BuildingBlocks.EventBus.Events
{
    public class IntegrationEvent
    {
        public IntegrationEvent()
        {
            Id = Guid.NewGuid();
            CreationDate = DateTime.UtcNow;
        }

        [JsonConstructor]
        public IntegrationEvent(string id, DateTime createDate)
        {
            Id = id;
            CreationDate = createDate;
        }

        [JsonProperty("id")]
        public string Id { get; private set; }

        [JsonProperty("senderId")]
        public string SenderId { get; private set; }

        [JsonProperty("creationDate")]
        public DateTime CreationDate { get; private set; }
    }
}
