var $ = function(id) {
    return document.getElementById(id);
};
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var dayNames = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
var CookiePrefix = "webgate_";
var cmdPrefix = "!";
var ssi = 0;
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

var svgReddit = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.715 0-1.363.286-1.84.746-1.81-1.191-4.259-1.949-6.971-2.046l1.483-4.669 4.016.941-.006.058c0 1.193.975 2.163 2.174 2.163 1.198 0 2.172-.97 2.172-2.163s-.975-2.164-2.172-2.164c-.92 0-1.704.574-2.021 1.379l-4.329-1.015c-.189-.046-.381.063-.44.249l-1.654 5.207c-2.838.034-5.409.798-7.3 2.025-.474-.438-1.103-.712-1.799-.712-1.465 0-2.656 1.187-2.656 2.646 0 .97.533 1.811 1.317 2.271-.052.282-.086.567-.086.857 0 3.911 4.808 7.093 10.719 7.093s10.72-3.182 10.72-7.093c0-.274-.029-.544-.075-.81.832-.447 1.405-1.312 1.405-2.318zm-17.224 1.816c0-.868.71-1.575 1.582-1.575.872 0 1.581.707 1.581 1.575s-.709 1.574-1.581 1.574-1.582-.706-1.582-1.574zm9.061 4.669c-.797.793-2.048 1.179-3.824 1.179l-.013-.003-.013.003c-1.777 0-3.028-.386-3.824-1.179-.145-.144-.145-.379 0-.523.145-.145.381-.145.526 0 .65.647 1.729.961 3.298.961l.013.003.013-.003c1.569 0 2.648-.315 3.298-.962.145-.145.381-.144.526 0 .145.145.145.379 0 .524zm-.189-3.095c-.872 0-1.581-.706-1.581-1.574 0-.868.709-1.575 1.581-1.575s1.581.707 1.581 1.575-.709 1.574-1.581 1.574z\"/></svg>";

var svgCode = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M24 10.935v2.131l-8 3.947v-2.23l5.64-2.783-5.64-2.79v-2.223l8 3.948zm-16 3.848l-5.64-2.783 5.64-2.79v-2.223l-8 3.948v2.131l8 3.947v-2.23zm7.047-10.783h-2.078l-4.011 16h2.073l4.016-16z\" /></svg>";

var svgNews = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M21 9.662c-2.287.194-5.197 1.038-7 1.794v-1.064c1.933-.721 4.598-1.54 7-1.745v1.015zm0 2.031c-2.287.194-5.197 1.038-7 1.794v-1.064c1.933-.721 4.598-1.54 7-1.745v1.015zm0 2.031c-2.287.194-5.197 1.038-7 1.794v-1.064c1.933-.721 4.598-1.54 7-1.745v1.015zm0 2.031c-2.287.194-5.197 1.038-7 1.794v-1.064c1.933-.721 4.598-1.54 7-1.745v1.015zm0-9.951c-2.402.204-5.068 1.024-7 1.745v1.933c1.804-.756 4.713-1.6 7-1.794v-1.884zm-18 2.843c2.402.205 5.067 1.024 7 1.745v1.064c-1.803-.756-4.713-1.6-7-1.794v-1.015zm0 2.031c2.402.205 5.067 1.024 7 1.745v1.064c-1.803-.756-4.713-1.6-7-1.794v-1.015zm0 2.031c2.402.205 5.067 1.024 7 1.745v1.064c-1.803-.756-4.713-1.6-7-1.794v-1.015zm0 2.032c2.402.205 5.067 1.024 7 1.745v1.064c-1.803-.756-4.713-1.6-7-1.794v-1.015zm0-7.054c2.287.194 5.196 1.038 7 1.794v-1.933c-1.932-.72-4.598-1.54-7-1.744v1.883zm9-2.724c-3.063-1.671-7.776-2.755-12-2.963v17c4.289.206 8.195 1.249 12 3 3.805-1.751 7.711-2.794 12-3v-17c-4.224.208-8.937 1.292-12 2.963zm-10-.791c4.264.496 6.86 1.467 9 2.545v12.702c-2.968-1.184-5.939-1.95-9-2.271v-12.976zm20 12.975c-3.061.321-6.032 1.088-9 2.271v-12.701c2.187-1.103 4.757-2.051 9-2.544v12.974z\" /></svg>";

var svgMore = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M16 6h-8v-6h8v6zm-10 12h-6v6h6v-6zm18 0h-6v6h6v-6zm-11-7v-3h-2v3h-9v5h2v-3h7v3h2v-3h7v3h2v-5h-9zm2 7h-6v6h6v-6z\" /></svg>";

var svgSocial = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z\" /></svg>";

var svgDownloads = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M23.984 11h-2.006c-.057-.557-.143-1.104-.287-1.631l1.82-.862c.245.799.401 1.632.473 2.493zm-3.035-3.493l1.81-.857c-.353-.7-.758-1.368-1.236-1.981l-1.512 1.318c.36.474.667.986.938 1.52zm.039 8.939c-.26.519-.562 1.01-.904 1.473l1.539 1.29c.465-.616.871-1.276 1.211-1.976l-1.846-.787zm-.836-13.238c-.589-.54-1.214-1.038-1.9-1.454l-1.216 1.599c.577.334 1.104.739 1.602 1.177l1.514-1.322zm-1.414 16.195c-1.779 1.608-4.129 2.597-6.713 2.597-5.525 0-10.021-4.486-10.021-10 0-3.692 2.021-6.915 5.011-8.647l-1.215-1.599c-3.473 2.103-5.8 5.897-5.8 10.246 0 6.627 5.385 12 12.025 12 3.204 0 6.107-1.259 8.264-3.297l-1.551-1.3zm3.258-6.403c-.054.54-.162 1.063-.299 1.574l1.864.795c.224-.762.372-1.553.439-2.369h-2.004zm-9.996 5l7-8h-4v-10h-6v10h-4l7 8z\" /></svg>";

var svgStream = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M19 12c-.341 0-.673-.033-1-.08v1.08h-2v-1.683c-.749-.356-1.427-.837-2-1.422v3.105h-8v-6h6.294c-.19-.634-.294-1.305-.294-2h-12v19h20v-12.08c-.327.047-.659.08-1 .08zm-15 10h-2v-2h2v2zm0-4h-2v-2h2v2zm0-5h-2v-2h2v2zm0-4h-2v-2h2v2zm10 13h-8v-6h8v6zm4 0h-2v-2h2v2zm0-4h-2v-2h2v2zm-3.711-14.667c.688-1.941 2.534-3.333 4.711-3.333 2.762 0 5 2.239 5 5 0 .285-.029.562-.074.833h-.635c-.474 0-.55-.211-.806-1.025-.186-.589-.493-1.479-1.171-1.479-.689 0-.957.923-1.205 1.669-.137.405-.217.65-.339.65-.116 0-.171-.245-.308-.65-.258-.759-.551-1.669-1.235-1.669-.711 0-1.016.995-1.22 1.628-.147.46-.194.691-.324.691-.111 0-.146-.187-.275-.56-.293-.85-.386-1.755-1.691-1.755h-.428zm8.941 3.334c-.957 0-1.185-.459-1.543-1.485-.221-.636-.245-.864-.373-.864-.126 0-.161.262-.408.964-.216.615-.514 1.379-1.136 1.379-.693 0-.987-.927-1.243-1.698-.142-.427-.177-.622-.3-.622-.115 0-.146.175-.291.598-.265.781-.559 1.722-1.253 1.722-.687 0-1-.926-1.171-1.479-.252-.818-.297-1.014-.755-1.014h-.684c-.044.27-.073.547-.073.832 0 2.761 2.238 5 5 5 2.177 0 4.022-1.392 4.709-3.333h-.479z\" /></svg>";

var svgCloud = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M24 21v-6h-18v6h18zm-3-4c.553 0 1 .448 1 1s-.447 1-1 1c-.552 0-1-.448-1-1s.448-1 1-1zm-7.806 0h1.275l-.864 2h-1.274l.863-2zm-2.141 0h1.275l-.863 2h-1.275l.863-2zm-2.19 0h1.275l-.863 2h-1.275l.863-2zm-4.863.941c-2.253-.29-4-2.194-4-4.524 0-2.252 1.626-4.121 3.767-4.506.177-3.294 2.895-5.911 6.233-5.911s6.056 2.617 6.233 5.911c2.005.361 3.541 2.029 3.729 4.089h-1.991c-.279-2.105-2.674-2.333-3.65-2.401.117-1.958-.555-5.599-4.321-5.599-4.438 0-4.359 4.75-4.321 5.599-.945-.037-3.679.341-3.679 2.818 0 1.223.856 2.245 2 2.511v2.013z\" /></svg>";

var svgSchool = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 50 50\"><path d=\"M 25 3 C 24.847656 3 24.703125 3.023438 24.5625 3.09375 L 0.5625 15.09375 C 0.0703125 15.339844 -0.152344 15.945313 0.09375 16.4375 C 0.339844 16.929688 0.941406 17.152344 1.4375 16.90625 L 25 5.125 L 48.5625 16.90625 C 48.707031 16.976563 48.851563 17 49 17 C 49.367188 17 49.730469 16.789063 49.90625 16.4375 C 50.152344 15.945313 49.929688 15.339844 49.4375 15.09375 L 25.4375 3.09375 C 25.296875 3.023438 25.152344 3 25 3 Z M 14 16.03125 C 6.503906 16.03125 2.570313 19.027344 2.40625 19.15625 C 2.167969 19.339844 2.03125 19.605469 2.03125 19.90625 L 2.03125 41 L 2 41 L 2 41.53125 C 2.203125 41.378906 2.34375 41.265625 2.40625 41.21875 C 2.777344 40.921875 6.632813 38.03125 14 38.03125 C 18.875 38.03125 22.222656 39.304688 24.03125 40.25 L 24.03125 18.21875 C 22.226563 17.296875 18.878906 16.03125 14 16.03125 Z M 36 16.03125 C 31.121094 16.03125 27.773438 17.296875 25.96875 18.21875 L 25.96875 40.25 C 27.777344 39.304688 31.125 38.03125 36 38.03125 C 43.59375 38.03125 47.464844 41.117188 47.625 41.25 C 47.726563 41.328125 47.835938 41.398438 47.96875 41.5 L 47.96875 19.90625 C 47.96875 19.605469 47.832031 19.339844 47.59375 19.15625 C 47.429688 19.027344 43.496094 16.03125 36 16.03125 Z M 14 39.96875 C 7.152344 39.96875 3.660156 42.722656 3.625 42.75 C 3.625 42.75 2.632813 43.503906 2 44.03125 L 2 45 C 2 45.554688 2.449219 46 3 46 L 20.46875 46 C 21.066406 46.753906 22.445313 48 25 48 C 27.554688 48 28.933594 46.753906 29.53125 46 L 47 46 C 47.554688 46 48 45.554688 48 45 L 48 44.03125 C 47.46875 43.601563 46.875 43.160156 46.40625 42.8125 C 46.378906 42.792969 46.367188 42.742188 46.34375 42.71875 C 45.902344 42.390625 42.414063 39.96875 36 39.96875 C 29.152344 39.96875 25.660156 42.722656 25.625 42.75 C 25.605469 42.765625 25.582031 42.769531 25.5625 42.78125 C 25.515625 42.8125 25.457031 42.851563 25.40625 42.875 C 25.390625 42.882813 25.390625 42.898438 25.375 42.90625 C 25.261719 42.953125 25.152344 42.964844 25.03125 42.96875 C 25.023438 42.96875 25.007813 42.96875 25 42.96875 C 24.867188 42.96875 24.746094 42.929688 24.625 42.875 C 24.613281 42.871094 24.574219 42.882813 24.5625 42.875 C 24.515625 42.855469 24.507813 42.839844 24.46875 42.8125 C 24.445313 42.796875 24.398438 42.769531 24.375 42.75 C 24.34375 42.726563 20.847656 39.96875 14 39.96875 Z \" /></svg>";

var linkMenu = [
    [svgSchool, "palegoldenrod", "-HEAD-"],
    ["VUNet", "https://vunet.vu.nl", ""],
    ["Canvas", "https://canvas.vu.nl", ""],
    ["DSA Course", "https://canvas.vu.nl/courses/36513/pages/preliminary-schedule-lectures-and-exercises-classes", ""],
    ["CP Gradebook", "https://canvas.vu.nl/courses/36431/gradebook"],
    [svgDownloads, "blue", "-HEAD-"],
    ["1337X", "https://1337x.to/home/", ""],
    ["RARBG", "https://rarbg.to/torrents.php", ""],
    ["BTDB", "https://btdb.to", ""],
    ["KickAss", "https://katcr.co/new/full/", ""],
    ["Zooqle", "https://zooqle.com", ""],
    ["EZTV", "https://eztv.ag", ""],
    ["GloDLS", "https://glodls.to", ""],
    ["YIFY Movies", "https://yts.am/browse-movies", ""],
    ["The Pirate Bay", "https://thepiratebay.rocks", ""],
    ["LimeTorrents", "https://www.limetorrents.info/home/", ""],
    ["WorldWide", "https://worldwidetorrents.me/home.php", ""],
    ["Mobilism", "https://forum.mobilism.org", ""],
    ["AppNee", "https://appnee.com", ""],
    ["CracksNow", "https://cracksnow.com", ""],
    ["AvaxHome", "https://avxhm.se", ""],
    ["DownTURK", "https://www.downturk.net", ""],
    ["MagazineLib", "https://magazinelib.com", ""],
    ["Sci-Hub", "https://sci-hub.tw", ""],
    ["LibGen", "http://libgen.io", ""],
    ["B-OK", "https://b-ok.xyz", ""],
    ["AudioBookBay", "http://audiobookbay.nl", ""],
    ["FitGirl Repacks", "http://fitgirl-repacks.site", ""],
    ["Good Downloads", "https://goodolddownloads.com", ""],
    ["MegaSearch", "http://megasearch.co", ""],
    ["SoftArchive", "https://sanet.st/full/", ""],
    ["ReleaseBB", "https://rlsbb.ru", ""],
    ["SceneSource", "https://scnsrc.me", ""],
    ["RapidMoviez", "http://rmz.cr", ""],
    ["DDLValley", "https://ddlvalley.me", ""],
    ["TwoDDL", "http://2ddl.ws", ""],
    ["Snahp.it", "https://snahp.it", ""],
    ["MKVCage", "https://www.mkvcage.ws", ""],
    ["YouTubeMP3", "https://youtubemp3.rip", ""],
    ["DatMusic", "https://datmusic.xyz", ""],
    ["Plank28", "https://www.zippyshare.com/plank28", ""],
    [svgStream, "purple", "-HEAD-"],
    ["YouTube", "https://www.youtube.com", ""],
    ["IOMovies", "https://www.iomovies.to", ""],
    ["Twitch", "https://www.twitch.tv", ""],
    ["Spotify", "https://open.spotify.com", ""],
    ["SoundCloud", "https://soundcloud.com", ""],
    ["Send It", "https://sendit.gg", ""],
    ["StreamCR", "https://scr.cr", ""],
    ["Ololo", "https://ololo.to", ""],
    ["9Anime", "https://9anime.is", ""],
    ["WatchCartoon", "https://www.watchcartoononline.com", ""],
    ["WatchSeries", "https://swatchseries.to", ""],
    ["Watch Series 2", "https://watch-series.ru", ""],
    ["Cine.to", "https://cine.to", ""],
    ["SockShare", "https://sockshare.video", ""],
    ["123Movies", "https://123movies.fun", ""],
    ["XMovies8", "http://xmovies8.io", ""],
    ["YesMovies", "https://yesmovies.to", ""],
    ["HDOnline", "https://hdo.to", ""],
    ["OnMovies", "https://onmovies.se", ""],
    ["AZMovies", "https://azmovies.xyz", ""],
    ["DagWood", "https://dagwood.co", ""],
    ["Ripple.is", "http://ripple.is", ""],
    ["BilaSport", "http://bilasport.net", ""],
    ["SpeedSports", "http://www.speedsports.me", ""],
    ["720pStream", "https://www.720pstream.me", ""],
    ["NFL Streams", "https://www.reddit.com/r/nflstreams/", ""],
    ["NBA Streams", "https://www.reddit.com/r/nbastreams/", ""],
    ["MLB Streams", "https://www.reddit.com/r/MLBStreams/", ""],
    ["NHL Streams", "https://www.reddit.com/r/NHLStreams/", ""],
    ["Soccer Streams", "https://www.reddit.com/r/soccerstreams/", ""],
    ["UstreaMix", "https://ssl.ustreamix.com", ""],
    ["Unblocked", "https://unblocked.lol", ""],
    [svgSocial, "green", "-HEAD-"],
    ["Discord", "https://discordapp.com", ""],
    ["Twitter", "https://twitter.com", ""],
    ["4Chan", "https://www.4chan.org", ""],
    ["Gab.ai", "https://gab.ai", ""],
    ["NotABug", "https://notabug.io", ""],
    ["Voat", "https://voat.co", ""],
    ["SaidIt", "https://saidit.net", ""],
    ["Steam", "https://steamcommunity.com/discussions/", ""],
    ["MPGH", "https://www.mpgh.net/forum/", ""],
    ["Bitcoin Talk", "https://bitcointalk.org", ""],
    ["DSLReports", "https://www.dslreports.com", ""],
    ["BleepingPC", "https://www.bleepingcomputer.com/forums/", ""],
    ["Dev.to", "https://dev.to", ""],
    ["Stack Exchange", "https://stackexchange.com", ""],
    ["LowEndTalk", "https://lowendtalk.com", ""],
    ["WebHostingTalk", "https://www.webhostingtalk.com", ""],
    ["WJunction", "http://www.wjunction.com", ""],
    ["BlackHatWorld", "https://www.blackhatworld.com", ""],
    ["My Digital Life", "https://forums.mydigitallife.net", ""],
    ["Torrent Invites", "https://torrentinvites.org", ""],
    ["Raid Forums", "https://raidforums.com", ""],
    ["Hack Forums", "https://hackforums.net", ""],
    ["Sentry MBA", "https://sentry.mba", ""],
    ["Sinisterly", "https://sinister.ly", ""],
    ["Nulled", "https://www.nulled.to", ""],
    ["NulledBB", "https://nulledbb.com", ""],
    ["OGUsers", "https://ogusers.com", ""],
    ["CorePack", "https://corepacks.com", ""],
    ["DarkUmbra", "https://darkumbra.net", ""],
    ["NSane Forums", "https://www.nsaneforums.com", ""],
    ["DirtyWarez", "https://forum.dirtywarez.com", ""],
    ["Warez-BB", "https://www.warez-bb.org", ""],
    ["Board4All", "https://www.board4all.biz", ""],
    ["Team OS", "https://www.teamos-hkrg.com", ""],
    ["AdiT-HD", "http://adit-hd.com", ""],
    [svgReddit, "cyan", "-HEAD-"],
    ["Reddit", "https://www.reddit.com", ""],
    ["World News", "https://www.reddit.com/user/goretsky/m/world_news/", ""],
    ["Technology", "https://www.reddit.com/user/goretsky/m/win_itpro/", ""],
    ["Security", "https://www.reddit.com/user/goretsky/m/security/", ""],
    ["Crypto", "https://www.reddit.com/user/und3rw4t3rp00ps/m/crypt/", ""],
    ["/r/Linux", "https://www.reddit.com/r/linux/", ""],
    ["/r/WebDev", "https://www.reddit.com/r/webdev/", ""],
    ["/r/Programming", "https://www.reddit.com/r/programming/", ""],
    ["/r/SoftwareSwap", "https://www.reddit.com/r/microsoftsoftwareswap/", ""],
    ["/r/TechSupport", "https://www.reddit.com/r/techsupport/", ""],
    ["/r/WebHosting", "https://www.reddit.com/r/webhosting/", ""],
    ["/r/LiveTvLinks", "https://www.reddit.com/r/LiveTvLinks/", ""],
    ["/r/SeedBoxes", "https://www.reddit.com/r/seedboxes/", ""],
    ["/r/Trackers", "https://www.reddit.com/r/trackers/", ""],
    ["/r/Piracy", "https://www.reddit.com/r/Piracy/", ""],
    ["/r/Privacy", "https://www.reddit.com/r/privacy/", ""],
    ["/r/Onions", "https://www.reddit.com/r/onions/", ""],
    ["/r/BTC", "https://www.reddit.com/r/btc/", ""],
    ["/r/Monero", "https://www.reddit.com/r/Monero/", ""],
    ["/r/CryptoCurrency", "https://www.reddit.com/r/CryptoCurrency/", ""],
    ["/r/WallStreetBets", "https://www.reddit.com/r/wallstreetbets/", ""],
    ["/r/SlaveLabour", "https://www.reddit.com/r/slavelabour/", ""],
    ["/r/RedditBay", "https://www.reddit.com/r/redditbay/", ""],
    ["/r/Networking", "https://www.reddit.com/r/HomeNetworking/", ""],
    ["/r/PCGaming", "https://www.reddit.com/r/pcgaming/", ""],
    ["/r/Scholar", "https://www.reddit.com/r/Scholar/", ""],
    ["/r/NetSec", "https://www.reddit.com/r/netsec/", ""],
    ["/r/BlackHat", "https://www.reddit.com/r/blackhat/", ""],
    ["/r/SysAdmin", "https://www.reddit.com/r/sysadmin/", ""],
    ["/r/HomeLab", "https://www.reddit.com/r/homelab/", ""],
    ["/r/CrackWatch", "https://www.reddit.com/r/CrackWatch/", ""],
    ["/r/Addons4Kodi", "https://www.reddit.com/r/Addons4Kodi/", ""],
    ["/r/MSToolkit", "https://www.reddit.com/r/MSToolkit/", ""],
    ["/r/NSFW411", "https://www.reddit.com/r/NSFW411/wiki/index", ""],
    ["Scammer List", "https://universalscammerlist.com", ""],
    [svgCode, "red", "-HEAD-"],
    ["GitHub", "https://github.com", ""],
    ["CodePen", "https://codepen.io/pens/", ""],
    ["Hackr", "https://hackr.io", ""],
    ["DevDocs", "https://devdocs.io", ""],
    ["Google Fonts", "https://google-webfonts-helper.herokuapp.com", ""],
    ["Font Squirrel", "https://www.fontsquirrel.com", ""],
    ["GetTheFont", "http://www.getthefont.com", ""],
    ["DaFont", "https://www.dafont.com", ""],
    ["iFonts", "https://ifonts.xyz", ""],
    ["Icons8", "https://icons8.com", ""],
    ["Paletton", "http://www.paletton.com", ""],
    ["BootstrapBuilder", "https://bootstrap.build", ""],
    ["JSBeautifier", "http://jsbeautifier.org", ""],
    ["JSCompress", "https://jscompress.com", ""],
    ["CSS Compressor", "https://csscompressor.com", ""],
    ["Favicon Gen", "https://favicon.io", ""],
    ["Favic-o-Matic", "http://www.favicomatic.com", ""],
    ["Browserling", "https://www.browserling.com", ""],
    ["GFXDomain", "http://forum.gfxdomain.net", ""],
    ["GraphicEX", "https://graphicex.com", ""],
    ["GFXTRA", "https://www.gfxtra.com", ""],
    ["Portaliz", "https://portaliz.info", ""],
    ["Web4Sync", "https://web4sync.com", ""],
    ["ScriptzNull", "https://scriptznull.nl", ""],
    ["XenForo Rocks", "https://www.xenforo.rocks", ""],
    ["Nulled Forum", "https://www.nulled.com.es", ""],
    ["Nulled Scripts", "http://www.nulled-scripts.xyz", ""],
    ["ThemeLock", "http://www.themelock.com", ""],
    ["WPLocker", "http://www.wplocker.com", ""],
    ["PSDKeys", "http://psdkeys.com", ""],
    ["CG Persia", "http://cgpersia.com", ""],
    ["VFXDownload", "https://vfxdownload.com", ""],
    ["ShareAE", "https://www.shareae.com", ""],
    ["UltraVFX", "http://www.ultravfx.com", ""],
    ["Selfhosted", "https://github.com/Kickball/awesome-selfhosted", ""],
    [svgNews, "orange", "-HEAD-"],
    ["Reuters", "http://www.reuters.com", ""],
    ["The Guardian", "https://www.theguardian.com", ""],
    ["Google News", "https://news.google.com", ""],
    ["Drudge Report", "http://drudgereport.com", ""],
    ["Zero Hedge", "http://www.zerohedge.com", ""],
    ["Ars Technica", "https://arstechnica.com", ""],
    ["Hacker News", "https://news.ycombinator.com", ""],
    ["Krebs Security", "https://krebsonsecurity.com", ""],
    ["DeepDotWeb", "https://www.deepdotweb.com", ""],
    ["TorrentFreak", "https://torrentfreak.com", ""],
    ["WirelesSHack", "http://www.wirelesshack.org", ""],
    ["EmuCR", "https://www.emucr.com", ""],
    ["Techmeme", "https://techmeme.com", ""],
    ["Slashdot", "https://slashdot.org", ""],
    ["Lobsters", "https://lobste.rs", ""],
    ["WccfTech", "https://wccftech.com", ""],
    ["Guru3D", "https://www.guru3d.com", ""],
    ["AnandTech", "http://www.anandtech.com", ""],
    ["TweakTown", "https://www.tweaktown.com", ""],
    ["XDA-Developers", "https://www.xda-developers.com", ""],
    ["The Register", "https://www.theregister.co.uk", ""],
    ["The Inquirer", "https://www.theinquirer.net", ""],
    ["Phoronix", "https://phoronix.com", ""],
    ["Threatpost", "https://threatpost.com", ""],
    ["Naked Security", "https://nakedsecurity.sophos.com", ""],
    ["WeLiveSecurity", "https://www.welivesecurity.com", ""],
    ["TheHackerNews", "https://thehackernews.com", ""],
    ["Speckyboy", "https://speckyboy.com", ""],
    ["Design Shack", "https://designshack.net", ""],
    ["Tech Guy Labs", "https://techguylabs.com", ""],
    ["TWiT Netcasts", "https://twit.tv", ""],
    ["SmashingSec", "https://www.smashingsecurity.com", ""],
    ["CoinTelegraph", "https://cointelegraph.com", ""],
    ["HowtoForge", "https://www.howtoforge.com", ""],
    ["Cata-List", "https://cata-list.github.io", ""],
    [svgCloud, "yellow", "-HEAD-"],
    ["Boring Host", "https://boring.host", ""],
    ["PostImages", "https://postimages.org", ""],
    ["Imgbox", "https://imgbox.com", ""],
    ["ImgBB", "https://imgbb.com", ""],
    ["FunkyIMG", "http://funkyimg.com", ""],
    ["ImageTwist", "https://imagetwist.com", ""],
    ["ImgTC", "https://imgtc.com", ""],
    ["IMGS", "http://imgs.fyi", ""],
    ["TinyIMG", "https://tinyimg.io", ""],
    ["DocDroid", "https://www.docdroid.net", ""],
    ["Instaudio", "https://instaud.io", ""],
    ["Google Drive", "https://www.google.com/drive/", ""],
    ["pCloud", "https://www.pcloud.com", ""],
    ["SpiderOak", "https://spideroak.com/one/", ""],
    ["Volafile", "https://volafile.org", ""],
    ["MediaFire", "https://www.mediafire.com", ""],
    ["Mega", "https://mega.nz", ""],
    ["Ge.tt", "http://ge.tt", ""],
    ["DBREE", "https://dbr.ee", ""],
    ["BayFiles", "https://bayfiles.com", ""],
    ["AnonFile", "https://anonfile.com", ""],
    ["SolidFiles", "https://www.solidfiles.com", ""],
    ["Openload", "https://openload.co", ""],
    ["ZippyShare", "http://zippyshare.com", ""],
    ["DropAPK", "https://dropapk.com", ""],
    ["NoFile", "https://nofile.io", ""],
    ["1fichier", "https://1fichier.com/?lg=en", ""],
    ["Userscloud", "https://userscloud.com", ""],
    ["FileFox", "https://filefox.cc", ""],
    ["Uploaded", "https://uploaded.net", ""],
    ["FileRio", "http://filerio.in", ""],
    ["Torrage", "https://torrage.info", ""],
    ["MultiFileMirror", "https://multifilemirror.com", ""],
    ["Premium Leech", "https://filehostlist.miraheze.org/wiki/Free_Premium_Leeches", ""],
    ["Trackers List", "https://github.com/ngosang/trackerslist", ""],
    [svgMore, "pink", "-HEAD-"],
    ["Amazon", "https://www.amazon.com", ""],
    ["PayPal", "https://www.paypal.com", ""],
    ["Gmail", "https://www.google.com/gmail/", ""],
    ["ProtonMail", "https://protonmail.com", ""],
    ["10 Minute Mail", "https://10minutemail.net", ""],
    ["PrivateBin", "https://privatebin.net", ""],
    ["Paste.ee", "https://paste.ee", ""],
    ["SmallPDF", "https://smallpdf.com", ""],
    ["VirusTotal", "https://www.virustotal.com", ""],
    ["Compressor", "https://compressor.io", ""],
    ["AlternativeTo", "https://alternativeto.net", ""],
    ["OlderGeeks", "https://oldergeeks.com", ""],
    ["DistroWatch", "https://DistroWatch.com", ""],
    ["Wallhalla", "https://wallhalla.com", ""],
    ["Draw", "https://www.draw.io", ""],
    ["Anon.to", "https://anon.to", ""],
    ["URLScan", "https://urlscan.io", ""],
    ["Ping", "https://ping.pe", ""],
    ["Censys", "https://censys.io", ""],
    ["BGPView", "https://bgpview.io", ""],
    ["DNSDumpster", "https://dnsdumpster.com", ""],
    ["HackerTarget", "https://hackertarget.com/ip-tools/", ""],
    ["SecurityTrails", "https://securitytrails.com", ""],
    ["CrimeFlare", "http://www.crimeflare.biz:82/cfs.html", ""],
    ["Privacy Tools", "https://www.privacytools.io", ""],
    ["Secured FYI", "https://secured.fyi", ""],
    ["0Day Today", "https://0day.today", ""],
    ["Sploitus", "https://sploitus.com", ""],
    ["The Eye", "https://the-eye.eu/public/", ""],
    ["DNStats", "https://dnstats.net", ""],
    ["OSINT", "https://github.com/jivoi/awesome-osint/blob/master/README.md", ""],
    ["Lists", "https://github.com/sindresorhus/awesome", ""],
    ["Hacking", "https://github.com/Hack-with-Github/Awesome-Hacking/blob/master/README.md", ""],
    ["Sysadmin", "https://github.com/n1trux/awesome-sysadmin", ""],
    ["PreDB", "https://predb.me", ""]
];

var searchInput = $('searchBar');
var rootSearchHelp = $('searchHelpMenu');
var rootMenuUL = $('categoryMenu');
var dateDiv = $('dateContainer');
var notesTextarea = $('notesInput');

function init() {
    initSearchBar();
    buildDate();
    buildHelp();
    buildMenu();
    $('body').style.opacity = 1;
    $('mainContainer').style.opacity = 1;
    $('dateContainer').style.opacity = 1;
    $('notesWidget').style.opacity = 1;
}

function initSearchBar() {
    if (searchSources[ssi] !== undefined) {
        var searchsave = GetCookie("engine") || "";
        if (searchsave !== "") {
            searchInput.placeholder = searchSources[searchsave][2];
            ssi = searchsave;
        } else
            searchInput.placeholder = searchSources[ssi][2];
    } else {
        ssi = 0;
        searchInput.placeholder = "Do you know what you're doing?";
        alert("Error: default search engine setting is invalid!");
    }

    document.addEventListener('keydown', switcheroo);
    searchInput.value = "";
}

function buildDate() {
    var today = new Date();
    var e = 12 < today.getHours() ? today.getHours() - 12 : today.getHours();
    var o = 12 <= today.getHours() ? "PM" : "AM";
    (e = e < 10 ? "0" + e : e) < 1 && (e = 12);
    var s = e + ":" + (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes()) + ":" + (today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds()) + " " + o;
    dateDiv.innerHTML = '<font class="font-2em">' + dayNames[today.getDay()] + "<br>" + monthNames[today.getMonth()] + " " + today.getDate() + ", " + today.getFullYear() + "<br>" + s + "</font>", setTimeout(buildDate, 1e3)
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

    rootSearchHelp.innerHTML = newHelp;
}

function buildMenu() {
    var newMenu = "";
    if (linkMenu[0][2] === "-HEAD-")
        newMenu += "<li class=\"button-container expanding-down\"><div class=\"button accent-" + (linkMenu[0][1] !== "" ? linkMenu[0][1].toLowerCase() : "white") + "\"><label class=\"button-content\">" + linkMenu[0][0] + "</label><div class=\"button-expanded-content\"><ul class=\"menu-link container\">";

    else {
        alert("linkMenu is invalid. Ensure to start the list with a -HEAD- entry.");
        return;
    }

    for (var i = 1; i < linkMenu.length; i++)
        if (linkMenu[i][2] === "-HEAD-")
            newMenu += "</ul></div></div></li><li class=\"button-container expanding-down\"><div class=\"button accent-" + (linkMenu[i][1] !== "" ? linkMenu[i][1].toLowerCase() : "white") + "\"><label class=\"button-content\">" + linkMenu[i][0] + "</label><div class=\"button-expanded-content\"><ul class=\"menu-link container\">";
        else
            newMenu += "<li class='menu-link-item'><a href=\"" + linkMenu[i][1] + "\" target=\"_self\"><label>" + linkMenu[i][0] + "</label></a></li>";
    newMenu += "</ul></div></div></li>";
    rootMenuUL.innerHTML = newMenu;
}

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
                        searchInput.placeholder = searchSources[ssi][2];
                        searchInput.value = query.replace(keyword, "").trim();
                        searchsave = ssi;
                        SetCookie("engine", searchsave, 365 * 24 * 60 * 60 * 1000);
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
                    searchInput.placeholder = searchSources[ssi][2];
                    searchInput.value = "";
                }
            } else {
                if (ssi == "3") {
                    window.location = searchSources[ssi][1].replace("{Q}", encodeURI(query));
                }
                else {
                    window.location = searchSources[ssi][1].replace("{Q}", encodeURIComponent(query));
                }
            }
        }
    }
    if (key === 27) {
        searchInput.blur();
    }
}

function handleNoteInput(event) {
    var key = event.keyCode || event.which;
    if (key === 27) notesTextarea.blur();
}
var noteText = null;

function handleNotes(event, focus) {
    if (focus) {
        if (!noteText) {
            noteText = GetCookie("notes") || "";
        }
        notesTextarea.value = noteText;
        addClass('notesContainer', "active");
    } else {
        removeClass('notesContainer', "active");
        if (noteText !== notesTextarea.value) {
            noteText = notesTextarea.value;
            SetCookie("notes", noteText, 365 * 24 * 60 * 60 * 1000);
        }
    }
}
var ignoredKeys = [9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 91, 92, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 144, 145];

function handleKeydown(event) {
    if (notesInput === document.activeElement || searchInput === document.activeElement || ignoredKeys.includes(event.keyCode))
        return;
    searchInput.focus();
}

function addClass(elementID, className) {
    $(elementID).classList.add(className);
}

function removeClass(elementID, className) {
    $(elementID).classList.remove(className);
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
    document.getElementById("mySidenav").style.width = "200px";
    document.getElementById("leftsidemenu").style.marginLeft = "200px";
    document.getElementById("leftsidemenu").style.opacity = "0";
    document.getElementById("leftsidemenu").style.transition = "0.5s";
    document.removeEventListener('keydown', switcheroo);
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("leftsidemenu").style.marginLeft = "0";
    document.getElementById("leftsidemenu").style.opacity = "1";
    document.addEventListener('keydown', switcheroo);
}
