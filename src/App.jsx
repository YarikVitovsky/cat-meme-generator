import { useState, useEffect } from 'react'
import './App.css'

function App() {
    const [catImage, setCatImage] = useState('')
    const [joke, setJoke] = useState('')
    const [loading, setLoading] = useState(false)
    const [darkTheme, setDarkTheme] = useState(false)

    // Load theme preference from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme === 'dark') {
            setDarkTheme(true)
        }
    }, [])

    // Apply theme to body
    useEffect(() => {
        if (darkTheme) {
            document.body.classList.add('dark-theme')
            localStorage.setItem('theme', 'dark')
        } else {
            document.body.classList.remove('dark-theme')
            localStorage.setItem('theme', 'light')
        }
    }, [darkTheme])

    const fetchData = async () => {
        setLoading(true)
        try {
            const [catRes, jokeRes] = await Promise.all([
                fetch('https://api.thecatapi.com/v1/images/search'),
                fetch('https://v2.jokeapi.dev/joke/Any?type=single')
            ])

            const catData = await catRes.json()
            const jokeData = await jokeRes.json()

            setCatImage(catData[0].url)
            setJoke(jokeData.joke)
        } catch (error) {
            console.error('Error fetching data:', error)
            setJoke('Error fetching data 😿')
        } finally {
            setLoading(false)
        }
    }

    // Fetch initial data
    useEffect(() => {
        fetchData()
    }, [])

    const handleThemeToggle = () => {
        setDarkTheme(!darkTheme)
    }

    return (
        <div className="app">
            <button
                id="theme-toggle"
                className="switch"
                onClick={handleThemeToggle}
                aria-label="Toggle theme"
            ></button>

            <div className="meme-content">
                <h1>🐱 Cat Meme Generator</h1>

                {loading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    <>
                        <img src={catImage} alt="Random Cat" />
                        <p>{joke}</p>
                    </>
                )}
            </div>

            <button
                className="generate-btn"
                onClick={fetchData}
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Generate Another 😺'}
            </button>
        </div>
    )
}

export default App