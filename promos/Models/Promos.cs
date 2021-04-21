using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace promos.Models
{
    public class Promos
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Description is Required")]
        public string Description { get; set; }
        [Required(ErrorMessage = "Promocodeis Required")]
        public string Promocode { get; set; }
        [Required(ErrorMessage = "Status is Required")]
        [DefaultValue(false)]
        public bool Status { get; set; }
    }
}
