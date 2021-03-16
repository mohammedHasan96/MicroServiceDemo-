using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MicroServicesDemo.Basket.Models
{
    public class Wrapper<T>
    {
        [JsonProperty("success")]
        public bool Success { get; set; }

        [JsonProperty("data")]
        public T Data { get; set; }

        public static implicit operator Wrapper<T>(T t) => new Wrapper<T> { Success = true, Data = t };
    }
}
