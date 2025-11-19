using server.Data;
using server.DTOs;
using server.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using server.Services.Interfaces;

namespace server.Services.Implementations
{
    public class VendorWorkService : IVendorWorkService
    {
        private readonly AppDbContext _context;

        public VendorWorkService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<VendorWork>> GetAllAsync()
        {
            return await _context.VendorWorks
                .Include(v => v.Vendor)
                .ToListAsync();
        }

        public async Task<VendorWork?> GetByIdAsync(int id)
        {
            return await _context.VendorWorks
                .Include(v => v.Vendor)
                .FirstOrDefaultAsync(v => v.Id == id);
        }

        public async Task<VendorWork> CreateAsync(VendorWorkDTO dto)
        {
            var vendor = await _context.Vendors.FindAsync(dto.VendorId);
            if (vendor == null)
                throw new KeyNotFoundException("Vendor not found.");

            var vendorWork = new VendorWork
            {
                Vendor = vendor,
                ProjectName = dto.ProjectName,
                WorkDescription = dto.WorkDescription,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                Status = dto.Status
            };

            _context.VendorWorks.Add(vendorWork);
            await _context.SaveChangesAsync();
            return vendorWork;
        }

        public async Task<VendorWork?> UpdateAsync(int id, VendorWorkDTO dto)
        {
            var vendorWork = await _context.VendorWorks.FindAsync(id);
            if (vendorWork == null)
                return null;

            var vendor = await _context.Vendors.FindAsync(dto.VendorId);
            if (vendor == null)
                throw new KeyNotFoundException("Vendor not found.");

            vendorWork.Vendor = vendor;
            vendorWork.ProjectName = dto.ProjectName;
            vendorWork.WorkDescription = dto.WorkDescription;
            vendorWork.StartDate = dto.StartDate;
            vendorWork.EndDate = dto.EndDate;
            vendorWork.Status = dto.Status;

            await _context.SaveChangesAsync();
            return vendorWork;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var vendorWork = await _context.VendorWorks.FindAsync(id);
            if (vendorWork == null)
                return false;

            _context.VendorWorks.Remove(vendorWork);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
