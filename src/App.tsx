import { Admin, CustomRoutes, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import MissionCreate from './components/MissionCreate';
import Missions from './components/Missions';
import Sessions from './components/Sessions';
import SessionCreate from './components/SessionCreate';
import Members from './components/Member';
import { Route } from 'react-router-dom';
import MyLayout from './components/Layout';
import { BASE_URL } from './client';


import PopularStudylogsUpdate from './customPages/PopularStudylogsUpdatePage';
import RoadmapSelectSessionPage from './customPages/RoadmapSelectSessionPage';
import RoadMapSelectTopKeywordPage from './customPages/RoadmapSelectTopKeywordPage';
import RoadmapTopKeywordsPage from './customPages/RoadmapTopKeywordsPage';
import RoadmapEditKeywordPage from './customPages/RoadmapEditKeywordPage';
import RoadmapQuizsPage from './customPages/RoadmapQuizsPage';

const dataProvider = jsonServerProvider(BASE_URL);

function App() {
  return (
    <Admin layout={MyLayout} dataProvider={dataProvider}>
      <Resource name="missions" list={Missions} create={MissionCreate} />
      <Resource name="sessions" list={Sessions} create={SessionCreate} />
      <CustomRoutes>
        <Route path="/members" element={<Members />} />
        <Route path="/studylogs" element={<PopularStudylogsUpdate />} />
        <Route path="/roadmap" element={<RoadmapSelectSessionPage />} />
        <Route
          path="/roadmap/:sessionId"
          element={<RoadMapSelectTopKeywordPage />}
        />
        <Route
          path="/roadmap/:sessionId/:keywordId/quizs"
          element={<RoadmapQuizsPage />}
        />
        <Route
          path="/roadmap/:sessionId/:keywordId"
          element={<RoadmapTopKeywordsPage />}
        />
        <Route
          path="/roadmap/:sessionId/editSubKeywords"
          element={<RoadmapEditKeywordPage />}
        />
      </CustomRoutes>
    </Admin>
  );
}

export default App;
