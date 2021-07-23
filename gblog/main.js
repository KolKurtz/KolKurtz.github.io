//GBLOG MAIN KOLKURTZ 2021
//TODO
//Hovermode toggle - zoom images
//Posts loader
//Post editor



//MAIN    

function runMain()
{
    $('.modal').hide();

    //load posts
    jQuery.get('posts/posts.txt', function(data) 
    {
        alert(data);
    });


    //check for local storage
    if(localStorage.getItem('test')) 
    {
    } 
    else 
    {
        alert("Unsupported data storage API")
    }
}
