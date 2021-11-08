using Asset.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Asset.Interfaces
{
    public interface ITestCaseService
    {
        Task<int> csvData(List<AssetProcess> csvProcess);
    }
}