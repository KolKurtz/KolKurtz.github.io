//GBLOG MAIN KOLKURTZ 2021
//v0.4.3
//TODO

const taglines = ["Come with me if you want to live","Get to the chopper","Get down","I'm from Beunos Ares and I say kill em all...","Come on you apes! You want to live forever?","It's an ugly planet. A BUG planet!","The disposal units ran night and day. We were that close to going out forever",
"Phased plasma rifle in the 40-watt range.","You know, Burke, I don't know which species is worse.","That's it, man. Game over, man. Game over!"];

var posts = {};
var zoomOn = false;



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


function refreshTagline()
{
    var selectionQ = Math.floor(Math.random() * taglines.length);
    $('#tagline').text(taglines[selectionQ]);
}


//zoom controls
function toggleZoom()
{
    if(zoomOn == true)
    {
        zoomOn = false;
        $('#zoomifier').text("zoomifier");
        $('img').off();
    }
    else
    {
        //get available screen width

        var availW = window.innerWidth;        

        //enable zoomy
        zoomOn = true;
        $('#zoomifier').append('<span class="signif">-ON</span>');
        $('img').on('mousedown', function () 
        {
            var imgUrl = $(this).attr('src'); 
            console.log(imgUrl);
            $('#imageFrame').append('<img class="fullImg" width="' + availW + '" src=' + imgUrl +'>');
            $('.modal').show();
        });
    }
}

//open stats library
function goStatsLib()
{
    //load the stats library
}



//modal control
//hide modal on escape or close click
$(document).keydown(function(e) 
{
    if(e.keyCode == 27) {
        $(".modal").hide(300);
}
});

$(".close").click(function()
{
    $('#imageFrame').empty();
    $(".modal").fadeOut();
});




//MAIN    

function runMain()
{
    $('.modal').hide();

    //load tagline
    refreshTagline();

    //UI BINDING
    $('.tool').click(function(){
        var clicky = $(this).attr('id');
        if(clicky=="kkhome")
        {
            window.location="https://kolkurtz.github.io/";
        }
        else if(clicky=="zoomifier")
        {
            toggleZoom();
        }
        else if(clicky=="stats")
        {
            goStatsLib();        }
        else
        {
            console.log("Out of options");
        }
    });

    //load posts
    jQuery.get('posts/posts.txt', function(data) 
    {
        //parse into the posts object
        posts = parsePosts(data);
    });

}
