//GBLOG MAIN KOLKURTZ 2021
//v1.0.0
//TODO
// finish meta term search to show related posts - complete displayPosts

const taglines = ["Come with me if you want to live","Get to the chopper","Get down","I'm from Beunos Ares and I say kill em all...","Come on you apes! You want to live forever?","It's an ugly planet. A BUG planet!","The disposal units ran night and day. We were that close to going out forever",
"Phased plasma rifle in the 40-watt range.","You know, Burke, I don't know which species is worse.","That's it, man. Game over, man. Game over!"];

var zoomOn = false;
var posts = {};


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


    //check for meta
    if (location.href.indexOf("?") === -1) 
    {
        displayPosts(false);
    }
    else 
    {
        console.log("Meta filtered");
        displayPosts(true);
    }
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
function displayPosts(metaOn)
{
    //do posts flow filtered by meta term
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const filterTerm = urlParams.get('meta');
    console.log(filterTerm);

    for(item in posts)
    {
        if(metaOn === false)
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
        

            //split the meta tags
            var splitMeta = posts[item].meta.split(",");

            var composedMeta = "";

            for(i=0;i<splitMeta.length;i++)
            {
                composedMeta = composedMeta + "<span class=metaItem> " + splitMeta[i] + " </span>";
            }

            //get new post and add components, filling from posts object
            var newPostName = "#"+item;
            $(newPostName).append('<div class="pTitle">' + posts[item].title + '</div><div class="pBody"><p>' + processTag(posts[item].body) + '</div><div class="pMeta">' + composedMeta + '</div>');
        }
        else
        {
            if(posts[item].meta.indexOf(filterTerm) === -1)
            {
                console.log("item skipped, null hit")
            }
            else
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

                //split the meta tags
                var splitMeta = posts[item].meta.split(",");

                var composedMeta = "";

                for(i=0;i<splitMeta.length;i++)
                {
                    composedMeta = composedMeta + "<span class=metaItem> " + splitMeta[i] + " </span>";
                }

                //get new post and add components, filling from posts object
                var newPostName = "#"+item;
                $(newPostName).append('<div class="pTitle">' + posts[item].title + '</div><div class="pBody"><p>' + processTag(posts[item].body) + '</div><div class="pMeta">' + composedMeta + '</div>');              
            }
            
        }
    }


    console.log(posts);
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



//meta search
function metaSearch(searchTerm)
{

    $('#main').append(" " + searchTerm + "  - <span class='redoPosts'> back to all posts </span>");

    console.log("Finding other: " + searchTerm);
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
            goStatsLib();        
        }
        else
        {
            console.log("Out of options");
        }
    });

    $('body').on('click',".metaItem",function() 
    {
        //remove any existing meta from URL and reload with new meta
        var rootLoc = location.href.split("?");
        window.location = rootLoc[0] + "?meta=" + this.innerText;
    });

    $('body').on('click',".redoPosts",function() 
    {
        //remove any existing meta from URL and reload
        var rootLoc = location.href.split("?");
        window.location = rootLoc[0];
    });

    //load posts
    jQuery.get('posts/posts.txt', function(data) 
    {
        //parse into the posts object
        posts = parsePosts(data);
    });

}
