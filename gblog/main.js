
//MAIN    

function runMain()
{
    $('.modal').hide();
    //check for local storage
    if(localStorage.getItem('test')) 
    {
    } 
    else 
    {
        alert("Unsupported data storage API")
    }
}
