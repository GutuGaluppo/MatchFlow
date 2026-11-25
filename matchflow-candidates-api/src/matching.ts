import type { Candidate, CandidateRecord, Job, Requirement } from "./types.ts";

export const JOB: Job = {
  id: "instaffo-senior-product-engineer",
  title: "Senior Product Engineer (Frontend / React)",
  focus: "React + TypeScript, product ownership, UX, testing and end-to-end delivery",
  requirements: [
    { skill: "React", weight: 20, priority: "must_have" },
    { skill: "TypeScript", weight: 18, priority: "must_have" },
    { skill: "TanStack Query", weight: 12, priority: "must_have" },
    { skill: "Product Thinking", weight: 12, priority: "must_have" },
    { skill: "UX", weight: 10, priority: "must_have" },
    { skill: "Testing", weight: 8, priority: "must_have" },
    { skill: "Accessibility", weight: 5, priority: "nice_to_have" },
    { skill: "Ruby on Rails", weight: 5, priority: "nice_to_have" },
    { skill: "Docker", weight: 4, priority: "nice_to_have" },
    { skill: "MySQL", weight: 3, priority: "nice_to_have" },
    { skill: "Elasticsearch", weight: 2, priority: "nice_to_have" },
    { skill: "Python", weight: 1, priority: "nice_to_have" }
  ],
  disclaimer: "Fictional demonstration. The score counts declared skills only, not ability, suitability, or a hiring decision. Human review is required."
};

const normalize = (text: string): string => text.trim().toLowerCase();
const aliases = new Map<string, string>([["react query", "tanstack query"], ["rtl", "testing"]]);
const canonical = (skill: string) => aliases.get(normalize(skill)) ?? normalize(skill);

export function buildCandidate(record: CandidateRecord, job: Job = JOB): Candidate {
  const skillSet = new Set(record.skills.map(canonical));
  const matchedRequirements: Requirement[] = [];
  const missingRequirements: Requirement[] = [];
  for (const requirement of job.requirements) {
    (skillSet.has(canonical(requirement.skill)) ? matchedRequirements : missingRequirements).push(requirement);
  }
  const totalWeight = job.requirements.reduce((total, item) => total + item.weight, 0);
  const matchedWeight = matchedRequirements.reduce((total, item) => total + item.weight, 0);
  const matchScore = totalWeight === 0 ? 0 : Math.round((matchedWeight / totalWeight) * 100);
  return {
    ...record,
    matchScore,
    match: {
      jobId: job.id,
      matchedRequirements,
      missingRequirements,
      evidence: record.evidence,
      explanation: `${matchedRequirements.length} of ${job.requirements.length} skill requirements found in the fictional profile. The weighted overlap is ${matchScore}%. This is a demo heuristic, not a hiring recommendation.`
    }
  };
}
