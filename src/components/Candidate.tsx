import { candidateInterface } from "../interfaces/Candidate.interface"

export default function Candidate ({activeCandidate, setNextCandidate}: {activeCandidate: candidateInterface, setNextCandidate: CallableFunction}) {


    const nextCandidate = () => {
        setNextCandidate()
    }

    const saveCandidate = (candidates: [candidateInterface]) => {
        localStorage.setItem('candidates', JSON.stringify(candidates))
    }
    
    const saveAndNextCandidate = () => {
        const existingCandidates = localStorage.getItem('candidates')
        if (existingCandidates === null) saveCandidate([activeCandidate])
        else {
            const data = JSON.parse(existingCandidates)
            data.push(activeCandidate)
            saveCandidate(data)
        }
        nextCandidate()
    }


    return (
        <>
            <div className="min-w-1/5 rounded-xl">
                <div className="bg-white rounded-xl">
                    <img src={activeCandidate?.avatar_url !== null? activeCandidate?.avatar_url : '/github-logo.webp'} width={400} height={400} />
                </div>
                <div className="px-8 flex flex-col gap-8 py-4 bg-black rounded-b-xl">
                    <h2 className="">{activeCandidate?.name} ({activeCandidate?.login})</h2>
                    <p>Location: {activeCandidate?.location}</p>
                    <p>Email: {activeCandidate?.email}</p>
                    <p>Company: {activeCandidate?.company}</p>
                    <p>Bio: {activeCandidate?.bio}</p>
                </div>
                <div className="flex justify-between mt-8 text-black">
                    <button className="rounded-full bg-red-500 w-12 h-12 text-3xl" onClick={nextCandidate}>-</button>
                    <button className="rounded-full bg-green-500 w-12 h-12 text-3xl" onClick={() => saveAndNextCandidate()}>+</button>
                </div>
            </div>
        </>
    )
}