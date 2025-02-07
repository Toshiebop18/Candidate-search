import { candidateInterface } from "../interfaces/Candidate.interface";

const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    // console.log();
    const response = await fetch(
      `https://api.github.com/users?since=${start}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );
    
    //console.log('Response:', response);
    const data = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    console.log('Data:', data);
    return data;
  } catch (err) {
    console.log('an error occurred', err);
    return [];
  }
};

//import.meta.env.VITE_GITHUB_TOKEN
const searchGithubUser = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });
    const data: [candidateInterface] = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    //console.log(data)
    return data;
  } catch (err) {
    // console.log('an error occurred', err);
    return {};
  }
};

export { searchGithub, searchGithubUser };
