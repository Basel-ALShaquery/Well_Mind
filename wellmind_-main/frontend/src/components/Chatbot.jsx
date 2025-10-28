import React, { useState, useEffect } from 'react'

const Chatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: (
        <div>
          <p><strong>Hey there! I'm MindHelper 👋</strong></p>
          <p>I'm your friendly assistant from Well Mind, created by Basel to support your mental health journey.</p>
          <p>How are you feeling today?</p>
          <div className="quick-actions">
            <button className="quick-btn" onClick={() => quickAction('anxiety')}>😰 Feeling Anxious</button>
            <button className="quick-btn" onClick={() => quickAction('stress')}>😫 Too Stressed</button>
            <button className="quick-btn" onClick={() => quickAction('therapy')}>👥 Talk to a Pro</button>
            <button className="quick-btn" onClick={() => quickAction('resources')}>📚 Get Resources</button>
          </div>
        </div>
      )
    }
  ])
  const [userInput, setUserInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`

  const systemPrompt = `You are MindHelper, the friendly AI assistant for Well Mind website created by Basel Hossam Alshawqery.

WEBSITE FEATURES:
- Mood tracker with AI recommendations
- Therapy sessions with mental health professionals
- Mental health articles and podcasts
- Certified assessments (PHQ-9, GAD-7, etc.)

Talk like a caring friend. Be warm, supportive, and helpful.`

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage()
    }
  }

  const quickAction = (topic) => {
    const messages = {
      'anxiety': "I've been feeling really anxious lately",
      'stress': "I'm dealing with a lot of stress",
      'therapy': "Tell me about therapy sessions",
      'resources': "What mental health resources do you have?"
    }
    setUserInput(messages[topic])
    sendMessage()
  }

  const sendMessage = async () => {
    const message = userInput.trim()
    if (!message) return

    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: message }])
    setUserInput('')

    // Show typing indicator
    setIsTyping(true)

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: systemPrompt + "\n\nUser: " + message + "\n\nPlease respond in a warm, friendly way:"
            }]
          }],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 500,
          }
        })
      })

      const data = await response.json()
      setIsTyping(false)

      if (data.candidates && data.candidates[0].content.parts[0].text) {
        const botResponse = data.candidates[0].content.parts[0].text
        setMessages(prev => [...prev, { type: 'bot', content: botResponse }])
      } else {
        throw new Error('No response from AI')
      }

    } catch (error) {
      console.error('Error:', error)
      setIsTyping(false)
      setMessages(prev => [...prev, {
        type: 'bot',
        content: "I'm here to help! You can explore our mood tracker or therapy sessions. What's on your mind today? 💙"
      }])
    }
  }

  useEffect(() => {
    // Auto-open chat after 3 seconds if not opened before
    const timer = setTimeout(() => {
      if (!localStorage.getItem('chat_opened')) {
        setIsChatOpen(true)
        localStorage.setItem('chat_opened', 'true')
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="chatbot-container">
      <button className="chat-button" onClick={toggleChat}>
        <i className="fas fa-comments"></i> Mind Helper
      </button>

      <div className={`chat-window ${isChatOpen ? '' : 'hidden'}`}>
        <div className="chat-header">
          <button className="close-btn" onClick={toggleChat}>×</button>
          <h3>Well Mind Assistant</h3>
          <p>Your friendly mental health companion</p>
          <div className="creator-badge">By Basel Hossam</div>
        </div>

        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.type}-message`}>
              {typeof message.content === 'string' ? (
                <div dangerouslySetInnerHTML={{ __html: message.content.replace(/\n/g, '<br>') }} />
              ) : (
                message.content
              )}
            </div>
          ))}

          {isTyping && (
            <div className="typing-indicator">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          )}
        </div>

        <div className="chat-input-area">
          <input
            type="text"
            className="chat-input"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tell me what's on your mind..."
          />
          <button className="send-btn" onClick={sendMessage}>
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>

    </div>
  )
}

export default Chatbot