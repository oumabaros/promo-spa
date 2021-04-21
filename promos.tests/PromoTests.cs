using System;
using Xunit;
using promos.Models;

namespace promos.tests
{
    public class PromoTests
    {
        [Fact]
        public void CanChangeProductDescription()
        {
            // Arrange
            var p = new Promos { Description = "Test", Promocode="gpromocode",Status=true };
            // Act
            p.Description = "New Description";
            //Assert
            Assert.Equal("New Description",p.Description );
        }
        [Fact]
        public void CanChangePromoCode()
        {
            // Arrange
            var p = new Promos { Description = "Test2", Promocode="hpromocode",Status=true };
            // Act
            p.Promocode = "gpromocode"; 
       
        //Assert
        Assert.Equal("hpromocode", p.Promocode);
        }
    }
}
