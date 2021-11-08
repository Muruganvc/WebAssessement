using Asset.Interfaces;
using Asset.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Asset.Services
{
    public class TestCaseService : ITestCaseService
    {
        private readonly AssetContext _context;
        public TestCaseService(AssetContext context)
        {
            _context = context;
        }

        public async Task<int> csvData(List<AssetProcess> csvProcess)
        {
            foreach(AssetProcess ap in csvProcess)
            {
                _context.Add(ap);
            }
            return await _context.SaveChangesAsync();
        }

    }
}
