import { useState } from "react";
import { candidateInterface } from "../interfaces/Candidate.interface";

const SavedCandidates = () => {


  const retrievedata = () => {
      let data : [candidateInterface];
      const candidates = localStorage.getItem('candidates')
      if (candidates) {
        data = JSON.parse(candidates)
        //setCandidates(data)
        return data
      }
      else return null
      
  }

  const [candidates, setCandidates] = useState<candidateInterface[] | null>(retrievedata())

  const removeCandidate = (e: any) => {
    const id = e.target.dataset.id;
    if (candidates !== null) {
      setCandidates([...candidates.slice(0, id), ...candidates.slice(id + 1)])
    }
  }

  return (
    <>
      <h1>Potential Candidates</h1>
      <table className="flex flex-col min-w-[80vw] bg-black">
        <tr className="grid grid-cols-7 even:bg-[#333333]">
          <tr>Image</tr>
          <tr>Name</tr>
          <tr>Location</tr>
          <tr>Email</tr>
          <tr>Company</tr>
          <tr>Bio</tr>
          <tr>Reject</tr>
        </tr>
        { candidates?.map((cc: candidateInterface, ind: number) =>
        <tr className="grid grid-cols-7 even:bg-[#333333] py-4 items-center" key={ind}>
          <td>
            <img src={cc.avatar_url === null? '/github-logo.webp': cc.avatar_url} className="w-12 mx-4" />
          </td>
          <td>
            {cc.name} ({cc.login})
          </td>
          <td>
            {cc.location}
          </td>
          <td>
            {cc.email}
          </td>
          <td>
            {cc.company}
          </td>
          <td>
            {cc.bio}
          </td>
          <td>
            <button className="rounded-full bg-red-500 w-12 h-12 text-3xl" data-id={ind} onClick={removeCandidate}>-</button>
          </td>
        </tr>
        )}
      </table>
    </>
  );
};

export default SavedCandidates;
