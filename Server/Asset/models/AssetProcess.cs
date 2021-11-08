using System;
using System.Collections.Generic;

#nullable disable

namespace Asset.models
{
    public partial class AssetProcess
    {
        public int Id { get; set; }
        public string Asset { get; set; }
        public string Country { get; set; }
        public string MimeType { get; set; }
    }
}
