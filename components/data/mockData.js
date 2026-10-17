// Mock friend activity data — designed to look real and rotate
// All avatars use deterministic SVG placeholders, all album art uses gradient placeholders.

export const FRIENDS = [
	{
		name: 'maya',
		avatar: 'M',
		color: '#FF3D9A',
		track: 'After Hours',
		artist: 'The Weeknd',
		context: { type: 'album', name: 'Dawn FM' },
		nowPlaying: true,
		minsAgo: 0,
		albumColor: '#0E0E0E'
	},
	{
		name: 'jordan',
		avatar: 'J',
		color: '#66D3A6',
		track: 'Pink Pony Club',
		artist: 'Chappell Roan',
		context: { type: 'playlist', name: 'pop girlies' },
		nowPlaying: true,
		minsAgo: 0,
		albumColor: '#FF8DC8'
	},
	{
		name: 'liam',
		avatar: 'L',
		color: '#A855F7',
		track: 'Not Like Us',
		artist: 'Kendrick Lamar',
		context: { type: 'artist', name: 'Kendrick Lamar' },
		nowPlaying: false,
		minsAgo: 4,
		albumColor: '#3B1E5E'
	},
	{
		name: 'priya',
		avatar: 'P',
		color: '#FFD60A',
		track: 'espresso',
		artist: 'Sabrina Carpenter',
		context: { type: 'album', name: 'Short n’ Sweet' },
		nowPlaying: true,
		minsAgo: 0,
		albumColor: '#F5C6A0'
	},
	{
		name: 'devon',
		avatar: 'D',
		color: '#19B169',
		track: 'Saturn',
		artist: 'SZA',
		context: { type: 'album', name: 'SOS Deluxe' },
		nowPlaying: false,
		minsAgo: 12,
		albumColor: '#1B3A2F'
	},
	{
		name: 'amaya',
		avatar: 'A',
		color: '#FF6FB1',
		track: 'Birds of a Feather',
		artist: 'Billie Eilish',
		context: { type: 'album', name: 'HIT ME HARD AND SOFT' },
		nowPlaying: true,
		minsAgo: 0,
		albumColor: '#7CC4B0'
	},
	{
		name: 'noah',
		avatar: 'N',
		color: '#C084FC',
		track: 'good luck, babe!',
		artist: 'Chappell Roan',
		context: { type: 'playlist', name: 'sunday loop' },
		nowPlaying: false,
		minsAgo: 23,
		albumColor: '#1E1B5E'
	},
	{
		name: 'rio',
		avatar: 'R',
		color: '#FFE34D',
		track: 'Lose Control',
		artist: 'Teddy Swims',
		context: { type: 'album', name: 'I’ve Tried Everything' },
		nowPlaying: false,
		minsAgo: 47,
		albumColor: '#B58A4A'
	}
]

export const TOP_SONGS = [
	{ rank: 1, title: 'Not Like Us', artist: 'Kendrick Lamar', color: '#3B1E5E' },
	{ rank: 2, title: 'espresso', artist: 'Sabrina Carpenter', color: '#F5C6A0' },
	{ rank: 3, title: 'Pink Pony Club', artist: 'Chappell Roan', color: '#FF8DC8' },
	{ rank: 4, title: 'Saturn', artist: 'SZA', color: '#1B3A2F' },
	{ rank: 5, title: 'After Hours', artist: 'The Weeknd', color: '#0E0E0E' },
	{ rank: 6, title: 'Birds of a Feather', artist: 'Billie Eilish', color: '#7CC4B0' },
	{ rank: 7, title: 'Lose Control', artist: 'Teddy Swims', color: '#B58A4A' }
]

export const TOP_ARTISTS = [
	{ rank: 1, name: 'Tyler, the Creator', genres: 'hip hop, jazz rap', color: '#FF7A45' },
	{ rank: 2, name: 'Chappell Roan', genres: 'pop, dance pop', color: '#FF3D9A' },
	{ rank: 3, name: 'SZA', genres: 'r&b, neo soul', color: '#1B3A2F' },
	{ rank: 4, name: 'Frank Ocean', genres: 'r&b, alternative', color: '#5C8FD6' },
	{ rank: 5, name: 'Kendrick Lamar', genres: 'hip hop, west coast', color: '#3B1E5E' },
	{ rank: 6, name: 'Billie Eilish', genres: 'pop, alt pop', color: '#7CC4B0' },
	{ rank: 7, name: 'Mitski', genres: 'indie, art pop', color: '#A06CFF' }
]

export const TESTIMONIALS = [
	{
		quote:
			'why did nobody tell me about this app sooner?? spotivity is the only app I check every morning',
		author: '@maya_listens',
		role: 'beta user'
	},
	{
		quote:
			'just my friends’ taste, all in one place 🍓 it’s the cleanest music app i have',
		author: '@jordanmusic',
		role: 'tiktok creator'
	},
	{
		quote:
			'finally a real music-sharing app that lives where i actually do — on my phone.',
		author: 'app store review',
		role: '★ ★ ★ ★ ★'
	},
	{
		quote:
			'discovered my new favorite artist from a coworker’s feed. spotivity is so real',
		author: '@devonplays',
		role: 'reddit'
	},
	{
		quote:
			'my top songs page is unreal. i screenshot it every week.',
		author: '@priyalists',
		role: 'design student'
	},
	{
		quote:
			'seeing what my crush is listening to without opening spotify is dangerous',
		author: '@amaya.fm',
		role: 'tiktok'
	}
]

export const FAQS = [
	{
		q: 'Is Spotivity affiliated with Spotify?',
		a: 'No — Spotivity is an independent app. You log in with your Spotify account, but Spotivity is not made by or endorsed by Spotify AB.'
	},
	{
		q: 'Is Spotivity free to download?',
		a: 'Yes — Spotivity is free to download on iOS and Android, and there are no ads. Optional donations help support development and keep it running.'
	},
	{
		q: 'Do I need Spotify Premium?',
		a: 'No — both free and Premium Spotify accounts work. You just need a Spotify account to log in.'
	},
	{
		q: 'How does the friend activity feed work?',
		a: 'After you log in with Spotify, Spotivity surfaces what your friends are playing right now in a beautifully designed live feed, with album art, context, and a tap-to-open link.'
	},
	{
		q: 'Why can’t I see some of my friends?',
		a: 'Your friends need to have their Spotify listening activity set to public. Once they do, they’ll appear in your feed instantly.'
	},
	{
		q: 'What can I see in the app?',
		a: 'Three main views: your friends’ live listening activity, your top songs, and your top artists. Each is tap-to-open in Spotify.'
	},
	{
		q: 'Are home-screen widgets coming?',
		a: 'On the roadmap. For now, the app focuses on a beautifully designed in-app experience.'
	},
	{
		q: 'Is my data safe?',
		a: 'Yes. Spotivity doesn’t store any of your data. Everything is fetched live from Spotify and shown on your phone, and there are no ads.'
	}
]
