// Initialisation of variables
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var dayNames = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
var oneYearMS = 365 * 24 * 60 * 60 * 1000
var CookiePrefix = "zerotab_";
var cmdPrefix = "!";
var ssi = 0;

// TODO: search sources in config file
var searchSources = [
    ["g", "https://www.google.com/search?q={Q}", "Google"],
    ["d", "https://duckduckgo.com/?q={Q}", "DuckDuckGo"],
    ["r", "https://reddit.com/r/{Q}", "Subreddit"],
    ["u", "https://{Q}", "Direct URL"],
    ["yt", "https://www.youtube.com/results?search_query={Q}", "YouTube"],
    ["t", "https:///1337x.to/search/{Q}/1/", "Torrents"],
    ["a", "https://www.google.com/search?q=intext:%22{Q}%22+(avi|mkv|mov|mp4|mpg|wmv|ac3|flac|m4a|mp3|ogg|wav|wma)+-inurl:(jsp|pl|php|html|aspx|htm|cf|shtml)+-inurl:(index_of|listen77|mp3raid|mp3toss|mp3drug|index_of|wallywashis)+intitle:%22index.of./%22", "Audio/Video"],
    ["s", "https://www.google.com/search?q=intext:%22{Q}%22+(apk|exe|dmg|iso|tar|7z|bz2|gz|iso|rar|zip)+-inurl:(jsp|pl|php|html|aspx|htm|cf|shtml)+-inurl:(index_of|listen77|mp3raid|mp3toss|mp3drug|index_of|wallywashis)+intitle:%22index.of./%22", "Software/Archive"]
];

// TODO: svg in config file
var svgReddit = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.715 0-1.363.286-1.84.746-1.81-1.191-4.259-1.949-6.971-2.046l1.483-4.669 4.016.941-.006.058c0 1.193.975 2.163 2.174 2.163 1.198 0 2.172-.97 2.172-2.163s-.975-2.164-2.172-2.164c-.92 0-1.704.574-2.021 1.379l-4.329-1.015c-.189-.046-.381.063-.44.249l-1.654 5.207c-2.838.034-5.409.798-7.3 2.025-.474-.438-1.103-.712-1.799-.712-1.465 0-2.656 1.187-2.656 2.646 0 .97.533 1.811 1.317 2.271-.052.282-.086.567-.086.857 0 3.911 4.808 7.093 10.719 7.093s10.72-3.182 10.72-7.093c0-.274-.029-.544-.075-.81.832-.447 1.405-1.312 1.405-2.318zm-17.224 1.816c0-.868.71-1.575 1.582-1.575.872 0 1.581.707 1.581 1.575s-.709 1.574-1.581 1.574-1.582-.706-1.582-1.574zm9.061 4.669c-.797.793-2.048 1.179-3.824 1.179l-.013-.003-.013.003c-1.777 0-3.028-.386-3.824-1.179-.145-.144-.145-.379 0-.523.145-.145.381-.145.526 0 .65.647 1.729.961 3.298.961l.013.003.013-.003c1.569 0 2.648-.315 3.298-.962.145-.145.381-.144.526 0 .145.145.145.379 0 .524zm-.189-3.095c-.872 0-1.581-.706-1.581-1.574 0-.868.709-1.575 1.581-1.575s1.581.707 1.581 1.575-.709 1.574-1.581 1.574z\"/></svg>";
var svgCode = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M24 10.935v2.131l-8 3.947v-2.23l5.64-2.783-5.64-2.79v-2.223l8 3.948zm-16 3.848l-5.64-2.783 5.64-2.79v-2.223l-8 3.948v2.131l8 3.947v-2.23zm7.047-10.783h-2.078l-4.011 16h2.073l4.016-16z\" /></svg>";
var svgNews = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M21 9.662c-2.287.194-5.197 1.038-7 1.794v-1.064c1.933-.721 4.598-1.54 7-1.745v1.015zm0 2.031c-2.287.194-5.197 1.038-7 1.794v-1.064c1.933-.721 4.598-1.54 7-1.745v1.015zm0 2.031c-2.287.194-5.197 1.038-7 1.794v-1.064c1.933-.721 4.598-1.54 7-1.745v1.015zm0 2.031c-2.287.194-5.197 1.038-7 1.794v-1.064c1.933-.721 4.598-1.54 7-1.745v1.015zm0-9.951c-2.402.204-5.068 1.024-7 1.745v1.933c1.804-.756 4.713-1.6 7-1.794v-1.884zm-18 2.843c2.402.205 5.067 1.024 7 1.745v1.064c-1.803-.756-4.713-1.6-7-1.794v-1.015zm0 2.031c2.402.205 5.067 1.024 7 1.745v1.064c-1.803-.756-4.713-1.6-7-1.794v-1.015zm0 2.031c2.402.205 5.067 1.024 7 1.745v1.064c-1.803-.756-4.713-1.6-7-1.794v-1.015zm0 2.032c2.402.205 5.067 1.024 7 1.745v1.064c-1.803-.756-4.713-1.6-7-1.794v-1.015zm0-7.054c2.287.194 5.196 1.038 7 1.794v-1.933c-1.932-.72-4.598-1.54-7-1.744v1.883zm9-2.724c-3.063-1.671-7.776-2.755-12-2.963v17c4.289.206 8.195 1.249 12 3 3.805-1.751 7.711-2.794 12-3v-17c-4.224.208-8.937 1.292-12 2.963zm-10-.791c4.264.496 6.86 1.467 9 2.545v12.702c-2.968-1.184-5.939-1.95-9-2.271v-12.976zm20 12.975c-3.061.321-6.032 1.088-9 2.271v-12.701c2.187-1.103 4.757-2.051 9-2.544v12.974z\" /></svg>";
var svgMore = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M16 6h-8v-6h8v6zm-10 12h-6v6h6v-6zm18 0h-6v6h6v-6zm-11-7v-3h-2v3h-9v5h2v-3h7v3h2v-3h7v3h2v-5h-9zm2 7h-6v6h6v-6z\" /></svg>";
var svgSocial = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z\" /></svg>";
var svgDownloads = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M23.984 11h-2.006c-.057-.557-.143-1.104-.287-1.631l1.82-.862c.245.799.401 1.632.473 2.493zm-3.035-3.493l1.81-.857c-.353-.7-.758-1.368-1.236-1.981l-1.512 1.318c.36.474.667.986.938 1.52zm.039 8.939c-.26.519-.562 1.01-.904 1.473l1.539 1.29c.465-.616.871-1.276 1.211-1.976l-1.846-.787zm-.836-13.238c-.589-.54-1.214-1.038-1.9-1.454l-1.216 1.599c.577.334 1.104.739 1.602 1.177l1.514-1.322zm-1.414 16.195c-1.779 1.608-4.129 2.597-6.713 2.597-5.525 0-10.021-4.486-10.021-10 0-3.692 2.021-6.915 5.011-8.647l-1.215-1.599c-3.473 2.103-5.8 5.897-5.8 10.246 0 6.627 5.385 12 12.025 12 3.204 0 6.107-1.259 8.264-3.297l-1.551-1.3zm3.258-6.403c-.054.54-.162 1.063-.299 1.574l1.864.795c.224-.762.372-1.553.439-2.369h-2.004zm-9.996 5l7-8h-4v-10h-6v10h-4l7 8z\" /></svg>";
var svgStream = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M19 12c-.341 0-.673-.033-1-.08v1.08h-2v-1.683c-.749-.356-1.427-.837-2-1.422v3.105h-8v-6h6.294c-.19-.634-.294-1.305-.294-2h-12v19h20v-12.08c-.327.047-.659.08-1 .08zm-15 10h-2v-2h2v2zm0-4h-2v-2h2v2zm0-5h-2v-2h2v2zm0-4h-2v-2h2v2zm10 13h-8v-6h8v6zm4 0h-2v-2h2v2zm0-4h-2v-2h2v2zm-3.711-14.667c.688-1.941 2.534-3.333 4.711-3.333 2.762 0 5 2.239 5 5 0 .285-.029.562-.074.833h-.635c-.474 0-.55-.211-.806-1.025-.186-.589-.493-1.479-1.171-1.479-.689 0-.957.923-1.205 1.669-.137.405-.217.65-.339.65-.116 0-.171-.245-.308-.65-.258-.759-.551-1.669-1.235-1.669-.711 0-1.016.995-1.22 1.628-.147.46-.194.691-.324.691-.111 0-.146-.187-.275-.56-.293-.85-.386-1.755-1.691-1.755h-.428zm8.941 3.334c-.957 0-1.185-.459-1.543-1.485-.221-.636-.245-.864-.373-.864-.126 0-.161.262-.408.964-.216.615-.514 1.379-1.136 1.379-.693 0-.987-.927-1.243-1.698-.142-.427-.177-.622-.3-.622-.115 0-.146.175-.291.598-.265.781-.559 1.722-1.253 1.722-.687 0-1-.926-1.171-1.479-.252-.818-.297-1.014-.755-1.014h-.684c-.044.27-.073.547-.073.832 0 2.761 2.238 5 5 5 2.177 0 4.022-1.392 4.709-3.333h-.479z\" /></svg>";
var svgCloud = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M24 21v-6h-18v6h18zm-3-4c.553 0 1 .448 1 1s-.447 1-1 1c-.552 0-1-.448-1-1s.448-1 1-1zm-7.806 0h1.275l-.864 2h-1.274l.863-2zm-2.141 0h1.275l-.863 2h-1.275l.863-2zm-2.19 0h1.275l-.863 2h-1.275l.863-2zm-4.863.941c-2.253-.29-4-2.194-4-4.524 0-2.252 1.626-4.121 3.767-4.506.177-3.294 2.895-5.911 6.233-5.911s6.056 2.617 6.233 5.911c2.005.361 3.541 2.029 3.729 4.089h-1.991c-.279-2.105-2.674-2.333-3.65-2.401.117-1.958-.555-5.599-4.321-5.599-4.438 0-4.359 4.75-4.321 5.599-.945-.037-3.679.341-3.679 2.818 0 1.223.856 2.245 2 2.511v2.013z\" /></svg>";
var svgSchool = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 50 50\"><path d=\"M 25 3 C 24.847656 3 24.703125 3.023438 24.5625 3.09375 L 0.5625 15.09375 C 0.0703125 15.339844 -0.152344 15.945313 0.09375 16.4375 C 0.339844 16.929688 0.941406 17.152344 1.4375 16.90625 L 25 5.125 L 48.5625 16.90625 C 48.707031 16.976563 48.851563 17 49 17 C 49.367188 17 49.730469 16.789063 49.90625 16.4375 C 50.152344 15.945313 49.929688 15.339844 49.4375 15.09375 L 25.4375 3.09375 C 25.296875 3.023438 25.152344 3 25 3 Z M 14 16.03125 C 6.503906 16.03125 2.570313 19.027344 2.40625 19.15625 C 2.167969 19.339844 2.03125 19.605469 2.03125 19.90625 L 2.03125 41 L 2 41 L 2 41.53125 C 2.203125 41.378906 2.34375 41.265625 2.40625 41.21875 C 2.777344 40.921875 6.632813 38.03125 14 38.03125 C 18.875 38.03125 22.222656 39.304688 24.03125 40.25 L 24.03125 18.21875 C 22.226563 17.296875 18.878906 16.03125 14 16.03125 Z M 36 16.03125 C 31.121094 16.03125 27.773438 17.296875 25.96875 18.21875 L 25.96875 40.25 C 27.777344 39.304688 31.125 38.03125 36 38.03125 C 43.59375 38.03125 47.464844 41.117188 47.625 41.25 C 47.726563 41.328125 47.835938 41.398438 47.96875 41.5 L 47.96875 19.90625 C 47.96875 19.605469 47.832031 19.339844 47.59375 19.15625 C 47.429688 19.027344 43.496094 16.03125 36 16.03125 Z M 14 39.96875 C 7.152344 39.96875 3.660156 42.722656 3.625 42.75 C 3.625 42.75 2.632813 43.503906 2 44.03125 L 2 45 C 2 45.554688 2.449219 46 3 46 L 20.46875 46 C 21.066406 46.753906 22.445313 48 25 48 C 27.554688 48 28.933594 46.753906 29.53125 46 L 47 46 C 47.554688 46 48 45.554688 48 45 L 48 44.03125 C 47.46875 43.601563 46.875 43.160156 46.40625 42.8125 C 46.378906 42.792969 46.367188 42.742188 46.34375 42.71875 C 45.902344 42.390625 42.414063 39.96875 36 39.96875 C 29.152344 39.96875 25.660156 42.722656 25.625 42.75 C 25.605469 42.765625 25.582031 42.769531 25.5625 42.78125 C 25.515625 42.8125 25.457031 42.851563 25.40625 42.875 C 25.390625 42.882813 25.390625 42.898438 25.375 42.90625 C 25.261719 42.953125 25.152344 42.964844 25.03125 42.96875 C 25.023438 42.96875 25.007813 42.96875 25 42.96875 C 24.867188 42.96875 24.746094 42.929688 24.625 42.875 C 24.613281 42.871094 24.574219 42.882813 24.5625 42.875 C 24.515625 42.855469 24.507813 42.839844 24.46875 42.8125 C 24.445313 42.796875 24.398438 42.769531 24.375 42.75 C 24.34375 42.726563 20.847656 39.96875 14 39.96875 Z \" /></svg>";
var svgMusic = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\"><path d=\"M16.899,3.05c-0.085-0.068-0.192-0.095-0.299-0.074L7.947,4.779c-0.17,0.034-0.291,0.182-0.291,0.353v7.364c-0.494-0.536-1.199-0.873-1.983-0.873c-1.491,0-2.704,1.213-2.704,2.704s1.213,2.704,2.704,2.704c1.491,0,2.705-1.213,2.705-2.704V7.952l7.933-1.659v4.399c-0.494-0.535-1.199-0.873-1.983-0.873c-1.491,0-2.704,1.213-2.704,2.704c0,1.492,1.213,2.705,2.704,2.705c1.49,0,2.704-1.213,2.704-2.705V3.33C17.031,3.221,16.982,3.119,16.899,3.05 M5.673,16.311c-1.094,0-1.983-0.889-1.983-1.983s0.889-1.983,1.983-1.983c1.095,0,1.983,0.889,1.983,1.983S6.768,16.311,5.673,16.311 M14.327,14.508c-1.095,0-1.983-0.889-1.983-1.984c0-1.094,0.889-1.982,1.983-1.982c1.094,0,1.983,0.889,1.983,1.982C16.311,13.619,15.421,14.508,14.327,14.508 M16.311,5.558L8.377,7.217V5.428l7.933-1.659V5.558z\"/></svg>";
var svgTools = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M 9.6660156 2 L 9.1757812 4.5234375 C 8.3516137 4.8342536 7.5947862 5.2699307 6.9316406 5.8144531 L 4.5078125 4.9785156 L 2.171875 9.0214844 L 4.1132812 10.708984 C 4.0386488 11.16721 4 11.591845 4 12 C 4 12.408768 4.0398071 12.832626 4.1132812 13.291016 L 4.1132812 13.292969 L 2.171875 14.980469 L 4.5078125 19.021484 L 6.9296875 18.1875 C 7.5928951 18.732319 8.3514346 19.165567 9.1757812 19.476562 L 9.6660156 22 L 14.333984 22 L 14.824219 19.476562 C 15.648925 19.165543 16.404903 18.73057 17.068359 18.185547 L 19.492188 19.021484 L 21.826172 14.980469 L 19.886719 13.291016 C 19.961351 12.83279 20 12.408155 20 12 C 20 11.592457 19.96113 11.168374 19.886719 10.710938 L 19.886719 10.708984 L 21.828125 9.0195312 L 19.492188 4.9785156 L 17.070312 5.8125 C 16.407106 5.2676813 15.648565 4.8344327 14.824219 4.5234375 L 14.333984 2 L 9.6660156 2 z M 11.314453 4 L 12.685547 4 L 13.074219 6 L 14.117188 6.3945312 C 14.745852 6.63147 15.310672 6.9567546 15.800781 7.359375 L 16.664062 8.0664062 L 18.585938 7.40625 L 19.271484 8.5917969 L 17.736328 9.9277344 L 17.912109 11.027344 L 17.912109 11.029297 C 17.973258 11.404235 18 11.718768 18 12 C 18 12.281232 17.973259 12.595718 17.912109 12.970703 L 17.734375 14.070312 L 19.269531 15.40625 L 18.583984 16.59375 L 16.664062 15.931641 L 15.798828 16.640625 C 15.308719 17.043245 14.745852 17.36853 14.117188 17.605469 L 14.115234 17.605469 L 13.072266 18 L 12.683594 20 L 11.314453 20 L 10.925781 18 L 9.8828125 17.605469 C 9.2541467 17.36853 8.6893282 17.043245 8.1992188 16.640625 L 7.3359375 15.933594 L 5.4140625 16.59375 L 4.7285156 15.408203 L 6.265625 14.070312 L 6.0878906 12.974609 L 6.0878906 12.972656 C 6.0276183 12.596088 6 12.280673 6 12 C 6 11.718768 6.026742 11.404282 6.0878906 11.029297 L 6.265625 9.9296875 L 4.7285156 8.59375 L 5.4140625 7.40625 L 7.3359375 8.0683594 L 8.1992188 7.359375 C 8.6893282 6.9567546 9.2541467 6.6314701 9.8828125 6.3945312 L 10.925781 6 L 11.314453 4 z M 12 8 C 9.8034768 8 8 9.8034768 8 12 C 8 14.196523 9.8034768 16 12 16 C 14.196523 16 16 14.196523 16 12 C 16 9.8034768 14.196523 8 12 8 z M 12 10 C 13.111477 10 14 10.888523 14 12 C 14 13.111477 13.111477 14 12 14 C 10.888523 14 10 13.111477 10 12 C 10 10.888523 10.888523 10 12 10 z\"/></svg>";

var noteText = null;
var ignoredKeys = [9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 91, 92, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 144, 145];

var $searchInput, $rootSearchHelp, $rootMenuUL, $dateDiv, $notesTextarea;

$(document).ready(function() {
    $searchInput = $('#searchBar');
    $rootSearchHelp = $('#searchHelpMenu');
    $rootMenuUL = $('#categoryMenu');
    $dateDiv = $('#dateContainer');
    $notesTextarea = $('#notesInput');

    init();

    $("#searchBar").focus(function() {
        $("#mainContainer").addClass("input-active");
    })

    $("#searchBar").blur(function() {
        $("#mainContainer").removeClass("input-active");
    })

    $("#searchBar").keydown(function(e) {
        handleQuery(e, this.value)
    })

    $("#mySidenav").mouseleave(closeNav);
    $(".closebtn").click(closeNav);
    $(".sidenavhome").mouseover(openNav);
    $("#opennavlink").click(openNav);
    $("#notesInput").keydown(handleNoteInput);
    $("#notesInput").focus(function(e) {
        handleNotes(e, true)
    });
    $("#notesInput").blur(function(e) {
        handleNotes(e, false)
    });

})

function loadConfig() {
    var menu = []

    $.ajax({
        url: "js/config.json",
        async: false,
        success: function(config) {
            var saved_cfg = GetCookie("config_length")
            if (saved_cfg != null && saved_cfg == config["length"]) {
                menu = JSON.parse(localStorage.getItem("menu"))
            } else {
                SetCookie("config_length", config["length"], oneYearMS)

                for (var i in config.content) {
                    menu.push(["svg" + i, config.content[i].accent, "-HEAD-"])

                    for (var link in config.content[i].links) {
                        var links = config.content[i].links
                        menu.push([link, links[link], ""])
                    }
                }
                localStorage.setItem("menu", JSON.stringify(menu))

            }
        },
        error: function(x, y, z) {}
    })
    return menu;
}

function initSearchBar() {
    ssi = 0;
    $searchInput.attr("placeholder", searchSources[ssi][2]);
    document.addEventListener('keydown', switcheroo);
    $searchInput.value = "";
}

function buildDate() {
    var today = new Date();
    var e = 12 < today.getHours() ? today.getHours() - 12 : today.getHours();
    var o = 12 <= today.getHours() ? "PM" : "AM";
    (e = e < 10 ? "0" + e : e) < 1 && (e = 12);
    var s = e + ":" + (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes()) + ":" + (today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds()) + " " + o;
    $dateDiv.html('<font class="font-2em">' + dayNames[today.getDay()] + "<br>" + monthNames[today.getMonth()] + " " + today.getDate() + ", " + today.getFullYear() + "<br>" + s + "</font>", setTimeout(buildDate, 1e3))
}

function buildHelp() {
    var newHelp = "<li><center>Change Search: Type 2 Character Code Followed By a Space</center></li>";
    console.log(searchSources[0][0]);
    console.log(searchSources[0][2]);
    for (var i = 1; i < searchSources.length; i++) {
        console.log(searchSources[i][0]);
        console.log(searchSources[i][2]);
        newHelp += "<li><span>!" + searchSources[i][0] + "</span> " + searchSources[i][2] + "</li>";
    }

    $rootSearchHelp.html(newHelp);
}

function buildMenu() {
    var newMenu = "";
    if (linkMenu[0][2] === "-HEAD-")
        newMenu += "<li class=\"button-container expanding-down\"><div class=\"button accent-" + (linkMenu[0][1] !== "" ? linkMenu[0][1].toLowerCase() : "white") + "\"><label class=\"button-content\">" + window[linkMenu[0][0]] + "</label><div class=\"button-expanded-content\"><ul class=\"menu-link container\">";

    else {
        alert("linkMenu is invalid. Ensure to start the list with a -HEAD- entry.");
        return;
    }

    for (var i = 1; i < linkMenu.length; i++) {
        if (linkMenu[i][2] === "-HEAD-") {
            newMenu += "</ul></div></div></li><li class=\"button-container expanding-down\"><div class=\"button accent-" + (linkMenu[i][1] !== "" ? linkMenu[i][1].toLowerCase() : "white") + "\"><label class=\"button-content\">" + window[linkMenu[i][0]] + "</label><div class=\"button-expanded-content\"><ul class=\"menu-link container\">";
        }
        else if (linkMenu[i][1] == "-") {
            newMenu += "<li class='menu-link-item'><hr/></li>";
        }
        else {
            newMenu += "<li class='menu-link-item'><a href=\"" + linkMenu[i][1] + "\" target=\"_self\"><label>" + linkMenu[i][0] + "</label></a></li>";
        }
    }
    newMenu += "</ul></div></div></li>";
    $rootMenuUL.html(newMenu);
}

function handleKeydown(event) {
    if (notesInput === document.activeElement || $searchInput === document.activeElement || ignoredKeys.includes(event.keyCode))
        return;
    $searchInput.focus();
}

function GetCookie(name) {
    try {
        var cookie = document.cookie;
        name = CookiePrefix + name;
        var valueStart = cookie.indexOf(name + "=") + 1;
        if (valueStart === 0) {
            return null;
        }
        valueStart += name.length;
        var valueEnd = cookie.indexOf(";", valueStart);
        if (valueEnd == -1)
            valueEnd = cookie.length;
        return decodeURIComponent(cookie.substring(valueStart, valueEnd));
    } catch (e) {
        console.log(e);
    }
    return null;
}

function SetCookie(name, value, expire) {
    var temp = CookiePrefix + name + "=" + escape(value) + ";" + (expire !== 0 ? "expires=" + ((new Date((new Date()).getTime() + expire)).toUTCString()) + ";" : " path=/;");
    console.log(temp);
    document.cookie = temp;
}

function CanSetCookies() {
    SetCookie('CookieTest', 'true', 0);
    var can = GetCookie('CookieTest') !== null;
    DelCookie('CookieTest');
    return can;
}

function DelCookie(name) {
    document.cookie = CookiePrefix + name + '=0; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
var switcheroo = function(event) {
    handleKeydown(event);
}

function openNav() {
    $("#mySidenav").css("width", "200px");
    $("#leftsidemenu").css("marginLeft", "200px");
    $("#leftsidemenu").css("opacity", "0");
    $("#leftsidemenu").css("transition", "0.5s");
    document.removeEventListener('keydown', switcheroo);
}

function closeNav() {
    $("#mySidenav").css("width", "0");
    $("#leftsidemenu").css("marginLeft", "0");
    $("#leftsidemenu").css("opacity", "1");
    document.addEventListener('keydown', switcheroo);
}

// Init called from HTML
function init() {
    linkMenu = loadConfig();
    initSearchBar();
    buildDate();
    buildHelp();
    buildMenu();
    $('#body').css("opacity", 1);
    $('#mainContainer').css("opacity", 1);
    $('#dateContainer').css("opacity", 1);
    $('#notesWidget').css("opacity", 1);
}

// Handlers called from HTML
function handleQuery(event, query) {
    var key = event.keyCode || event.which;
    if (query !== "") {
        var qlist;
        if (key === 32) {
            qList = query.split(" ");
            if (qList[0].charAt(0) === cmdPrefix) {
                var keyword = "";
                for (var i = 0; i < searchSources.length; i++) {
                    keyword = cmdPrefix + searchSources[i][0];
                    if (keyword === qList[0]) {
                        ssi = i;
                        $searchInput.attr("placeholder", searchSources[ssi][2]);
                        $searchInput.val(query.replace(keyword, "").trim());
                        event.preventDefault();
                        break;
                    }
                }
            }
        } else if (key === 13) {
            qList = query.split(" ");
            if (qList[0].charAt(0) === cmdPrefix) {
                var keyword = "";
                for (var i = 0; i < searchSources.length; i++) {
                    keyword = cmdPrefix + searchSources[i][0];
                    if (keyword === qList[0]) {
                        ssi = i;
                        break;
                    }
                }

                if (qList.length > 1) {
                    window.location = searchSources[ssi][1].replace("{Q}", encodeURIComponent(query.replace(keyword, ""))).trim();
                } else {
                    $searchInput.attr("placeholder", searchSources[ssi][2]);
                    $searchInput.value = "";
                }
            } else {
                if (ssi == "3") {
                    window.location = searchSources[ssi][1].replace("{Q}", encodeURI(query));
                } else {
                    window.location = searchSources[ssi][1].replace("{Q}", encodeURIComponent(query));
                }
            }
        }
    }
    if (key === 27) {
        $searchInput.blur();
    }
}

function handleNoteInput(event) {
    var key = event.keyCode || event.which;
    if (key === 27) $notesTextarea.blur();
}

function handleNotes(event, focus) {
    if (focus) {
        if (!noteText) {
            noteText = GetCookie("notes") || "";
        }
        $notesTextarea.val(noteText);
        $('#notesContainer').addClass("active");
    } else {
        $('#notesContainer').removeClass("active");
        if (noteText !== $notesTextarea.val()) {
            noteText = $notesTextarea.val();
            SetCookie("notes", noteText, 365 * 24 * 60 * 60 * 1000);
        }
    }
}
