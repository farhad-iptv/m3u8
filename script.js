const baseURL = "https://off1.jismhaitokia.com:999/hls/willowusa-"; // Base URL for segments
let currentSegmentNumber = 2628; // Start from the given segment number
const segmentCount = 10; // Number of segments to include in the playlist

// Function to generate the M3U8 playlist
function generatePlaylist() {
    const playlist = [];
    
    playlist.push('#EXTM3U');
    playlist.push('#EXT-X-VERSION:3');
    playlist.push(`#EXT-X-MEDIA-SEQUENCE:${currentSegmentNumber}`);
    playlist.push('#EXT-X-TARGETDURATION:1');

    for (let i = 0; i < segmentCount; i++) {
        playlist.push(`#EXTINF:1.0,`);
        playlist.push(`${baseURL}${currentSegmentNumber}.ts`);
        currentSegmentNumber++;
    }

    return playlist.join('\n');
}

// Function to display the generated playlist and prepare the download link
function displayPlaylist() {
    const playlistContent = generatePlaylist();
    document.getElementById('playlist').textContent = playlistContent; // Set the content of the pre element
    
    // Create a Blob and a URL for the playlist content
    const blob = new Blob([playlistContent], { type: 'application/vnd.apple.mpegurl' });
    const downloadLink = document.getElementById('download-link');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'video.m3u8'; // Set the name of the file to download
    downloadLink.textContent = 'Download M3U8 Playlist';
    downloadLink.style.display = 'block'; // Show the download link
}

// Call the function to display the playlist when the page loads
displayPlaylist();
