import { useEffect, useState } from 'react'
import './SocialFeed.css'

interface InstagramPost {
  id: string
  caption: string
  media_type: string
  media_url: string
  timestamp: string
  permalink: string
}

export default function SocialFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [loading, setLoading] = useState(true)
  const instagramHandle = 'immadhu1'
  const instagramUrl = `https://instagram.com/${instagramHandle}`

  useEffect(() => {
    fetchInstagramPosts()
  }, [])

  const fetchInstagramPosts = async () => {
    try {
      setLoading(true)
      
      const response = await fetch(
        `https://www.instagram.com/api/v1/users/web_profile_info/?username=${instagramHandle}`,
        {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        }
      )

      if (response.ok) {
        const data = await response.json()
        const edges = data.data.user.edge_owner_to_timeline_media.edges
        const fetchedPosts = edges.slice(0, 12).map(
          (edge: any) => ({
            id: edge.node.id,
            caption: edge.node.edge_media_to_caption.edges[0]?.node.text || 'Untitled',
            media_type: edge.node.__typename,
            media_url: edge.node.display_url,
            timestamp: new Date(edge.node.taken_at_timestamp * 1000).toLocaleDateString(),
            permalink: `https://instagram.com/p/${edge.node.shortcode}/`
          })
        )
        setPosts(fetchedPosts)
      }
    } catch (error) {
      console.log('Could not fetch Instagram posts')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="social-feed">
      <div className="social-feed__inner">
        <span className="social-feed__label">Follow Us</span>
        <h2 className="social-feed__title">Recent Work</h2>

        {loading ? (
          <p className="loading-text">Loading recent posts...</p>
        ) : posts.length > 0 ? (
          <div className="social-feed__grid">
            {posts.map((post) => (
              <a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="social-item"
              >
                <img src={post.media_url} alt={post.caption} className="social-item__image" />
              </a>
            ))}
          </div>
        ) : null}

        <div className="social-feed__cta">
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="social-feed__button">
            Follow on Instagram →
          </a>
        </div>
      </div>
    </section>
  )
}

declare global {
  interface Window {
    instgrm: any
  }
}
