//GBLOG MAIN KOLKURTZ 2021
//v0.3
//TODO
//Hovermode toggle - zoom images
//Posts loader
//Post editor

posts = {};



function parsePosts(inny)
{
    var splitPosts = inny.split('*');
    //drop first
    splitPosts.shift();

    //load up the posts object with its posts map
    for(i=0;i<splitPosts.length;i++)
    {
        var posty = splitPosts[i];
        var postySplit = posty.split('$');
        postySplit.shift();
        var postID = "post" + i;
        posts[postID]={"title":postySplit[0],"body":postySplit[1],"meta":postySplit[2]}
        
    }

    displayPosts();

    console.log(posts);
}


//find and convert tag syntax for images or lists
function processTag(bodyString)
{
    if(bodyString.indexOf("_")>-1)
    {
        //note closing the <P> before the new tag
        if(bodyString.indexOf("IMAGE_")>-1)
        {
            bodyString = bodyString.replace("IMAGE_","</p><img src='images/");
            bodyString = bodyString.replace("_","'>");        
        }
        else
        {
            bodySplit = bodyString.split("_");

            bodyString = bodyString.replace("LIST_","</p><a href='lists/");
            bodyString = bodyString.replace("_","'><div class='aList'></div>" + bodySplit[1] + "</a>");
        }
    }
    return bodyString;
}



//in its own function in case I write to JSON later
function displayPosts()
{
    for(item in posts)
    {
        $( "<div/>", 
        {
            "id": item,
            "class": "post",
            click: function() 
            {
            $( this ).toggleClass( "active" );
            }
        }).appendTo($('#main'));
    
        //get new post and add components, filling from posts object
        var newPostName = "#"+item;
        $(newPostName).append('<div class="pTitle">' + posts[item].title + '</div><div class="pBody"><p>' + processTag(posts[item].body) + '</div><div class="pMeta">' + posts[item].meta + '</div>');
    }
}




//MAIN    

function runMain()
{
    $('.modal').hide();

    //load posts
    jQuery.get('posts/posts.txt', function(data) 
    {
        //parse into the posts object
        posts = parsePosts(data);
    });

}
