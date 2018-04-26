using BlogProgramistyczny.Context;
using BlogProgramistyczny.Entites;
using System.Linq;

namespace Microsoft.AspNetCore.Builder
{
    public static class DbInitializer
    {
        public static void Init(ApplicationContext applicationContext)
        {
            applicationContext.Database.EnsureCreated();

            if (!applicationContext.Profile.Any())
            {
                applicationContext.Profile.Add(new Profil()
                {
                    Description = "Mimo ojcu Tace pali uczy pana Już. " +
                    "Nowo Zrobiła niby szanują usty dano Grom Nazywał się Usta Wreszcie rachunki. " +
                    "Chód Brał spał nisko Wilna biło wielu. " +
                    "Dowód Stały dobrze Niesiołowskiemu końcu który płaci najpiękniejszym żołniersczyzny." +
                    " Nazywano kara Chodził buja rachunki grządek Znam księcia nuda. " +
                    "Spadku bratni Białopiotrowiczowi Katona krucze. ",
                    Header = "Adam Malpka",
                    Title = "adam@malpak.com",
                    ImgPath = "",
                    Options = {
                        new ProfileOption()
                        {
                            Description = "Opis",
                            Title = "C++",
                            Value = "6"
                        }
                    }
                });

                applicationContext.SaveChanges();
            }
        }
    }
}
