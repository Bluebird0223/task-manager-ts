import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    teams: [
      { _id: 't1', name: 'Frontend Dev' },
      { _id: 't2', name: 'Marketing' }
    ],
    projects: [
      { _id: 'p1', name: 'TaskFlow UI v1', team: 't1' },
      { _id: 'p2', name: 'Q4 Campaign', team: 't2' },
    ],
  },
  reducers: {
    setTeams: (state, action) => {
      state.teams = action.payload;
    },
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
  },
});

export const { setTeams, setProjects } = dataSlice.actions;
export default dataSlice.reducer;