import React, { useState } from 'react';

const teams = [
  {
    name: 'Team A',
    members: [
      { name: 'Member 1', priority: 3 },
      { name: 'Member 2', priority: 3 },
      { name: 'Member 3', priority: 3 },
    ],
  },
  {
    name: 'Team B',
    members: [
      { name: 'Member 4', priority: 1 },
      { name: 'Member 5', priority: 2 },
    ],
  },
  // Add more teams as needed
];

const App = () => {
  const [task, setTask] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');

  const assignTask = () => {
    const teamIndex = teams.findIndex((team) => team.name === selectedTeam);
    if (teamIndex !== -1) {
      const team = teams[teamIndex];
      const members = [...team.members];

      members.sort((a, b) => a.priority - b.priority);

      let memberIndex = members.findIndex((member) => !member.task || member.task === task);
      if (memberIndex === -1) {
        memberIndex = 0;
      }

      members[memberIndex].task = task;
      setTask('');
      setSelectedTeam('');

      // Update the members array directly within the selected team
      teams[teamIndex].members = members;
    }
  };

  return (
    <div>
      <textarea
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task"
      />
      <select
        value={selectedTeam}
        onChange={(e) => setSelectedTeam(e.target.value)}
      >
        <option value="">Select a team</option>
        {teams.map((team) => (
          <option key={team.name} value={team.name}>
            {team.name}
          </option>
        ))}
      </select>
      <button onClick={assignTask}>Assign Task</button>

      {/* Display assigned tasks for each team member */}
      {teams.map((team) => (
        <div key={team.name}>
          <h3>{team.name}</h3>
          <ul>
            {team.members.map((member) => (
              <li key={member.name}>
                {member.name} - {member.task || 'No task assigned'}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default App;
