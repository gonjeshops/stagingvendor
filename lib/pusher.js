
import Pusher from "pusher-js";
import { useState } from "react";
import { toast } from "react-toastify";

export const PusherForm = () => {

    const [messages, setMessages] = useState()
    let allmessages = []

    const [formData, setFormData] = useState({ username: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
    try {
        const response = await fetch('/api/test/create-post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
    
        if (response.ok) {
          setIsLoading(false);
          toast.success('Form submitted successfully!');
        } else {
          // toast.error('Error, response not ok')
          throw new Error('Form submission failed');
          
        }
      } catch (err) {
        setError('An error occurred while submitting the form.');
        setIsLoading(false);
      }
    };

// Enable pusher logging - don't include this in production
        Pusher.logToConsole = true;

        var pusher = new Pusher('60daee776dfa85e62f98', {
        cluster: 'eu'
        });
    
        var channel = pusher.subscribe('my-channel');
        channel.bind('my-event', function(data) {
        allmessages.push(data)
        setMessages(allmessages)
        });

        return (
            <div className="container mx-auto mt-8">
              <h1 className="text-2xl font-bold">Next.js Form</h1>
              {error && <p className="text-red-500">{error}</p>}
              <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-4">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                    Username:
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="block w-full mt-1 p-2 border rounded border-gray-300 focus:ring focus:ring-blue-200"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-600">
                    Message:
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="block w-full mt-1 p-2 border rounded border-gray-300 focus:ring focus:ring-blue-200"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  {isLoading ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            </div>
          );
        }