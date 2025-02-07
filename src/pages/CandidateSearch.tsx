import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

import { candidateInterface } from '../interfaces/Candidate.interface';

import Candidate from '../components/Candidate';


const CandidateSearch = () => {
  const [candidates, setCandidates] = useState()
  const [activeCandidate, setActiveCandidate] = useState<candidateInterface | null>(null)
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const searchUsersGithub = async () => {
    const data = await searchGithub()
    //console.log(data)
    //setCandidates(data.map((dd: any) => dd.login))
    const usernames: [string] = data.map((dd: any) => dd.login)
    Promise.all(usernames.map((uu: string) => searchGithubUser(uu))).then((res: any) => {
      setCandidates(res)
      setActiveCandidate(res[0])
      setActiveIndex(0)
    } ).catch((err) => {
      console.log(err)
    })
  }

  const nextCandidate = () => {
    candidates && setActiveCandidate(candidates[activeIndex + 1]);
    candidates && setActiveIndex(activeIndex + 1)
  }

  useEffect(() => {
    searchUsersGithub()
  }, [])

  console.log(activeCandidate)

  return (
    <>
      <h1 className='mb-8'>CandidateSearch</h1>
      {activeCandidate && <Candidate activeCandidate={activeCandidate} setNextCandidate={nextCandidate} />}
    </>
  )}

export default CandidateSearch;
