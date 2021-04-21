#promos

 ​ASP.Net​ Core API for managing promo codes
## Setup

1. Restore Microsoft SQL Database located in database\promos.bkp using a tool of your choice. Microsoft SQL Server Management Studio will work fine. 
2. Database is compatible with MSSQL Server 2014 and above.
3. Open the solution file named "promos.sln" with Visual Studio 2019.
4. Open appsettings.json file located in .\promos folder and edit the entry "DefaultConnection": "Server=cfca;Database=promos;Trusted_Connection=True;MultipleActiveResultSets=true" 
   with your MSSQL Server's connection settings.
5. From Visual Studio, select "Build->Build Solution". This might take some time as Visual Studio downloads the project's dependencies. You must be connected 
   to the internet.
6. Select "Debug->Start Debugging" or press the "F5" button.
7. Login with Username : useruser@gmail.com , Password: UserUser@123
8. You may also create a new user from the login page.


