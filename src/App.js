import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState({
    Technology: false,
    Science: false,
    Art: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInterestChange = (e) => {
    const { name, checked } = e.target;
    setInterests((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <h1>My Portfolio</h1>
      <img
        src="https://via.placeholder.com/350"
        alt="My profile pic"
      />
      <h2>About Me</h2>
      <p>Lorem ipsum dolor sit amet...</p>
      <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      
      <h2>Newsletter Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label="Name"
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email"
          />
        </div>
        <div>
          <h3>Interests:</h3>
          {Object.keys(interests).map((interest) => (
            <div key={interest}>
              <input
                type="checkbox"
                id={interest}
                name={interest}
                checked={interests[interest]}
                onChange={handleInterestChange}
                aria-label={interest}
              />
              <label htmlFor={interest}>{interest}</label>
            </div>
          ))}
        </div>
        <button type="submit">Submit</button>
      </form>
      {submitted && (
        <div>
          <h2>Thank you, {name}!</h2>
          <p>Your interests: {Object.keys(interests).filter((key) => interests[key]).join(", ")}</p>
        </div>
      )}
    </div>
  );
}

export default App;
