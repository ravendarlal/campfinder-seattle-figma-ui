import { useState } from 'react';
import Nav from './components/Nav/Nav';
import HomePage from './components/HomePage/HomePage';
import ResultsPage from './components/ResultsPage/ResultsPage';
import DetailPage from './components/DetailPage/DetailPage';
import type { Page, Camp } from './types';
import styles from './App.module.css';

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCamp, setSelectedCamp] = useState<Camp | null>(null);

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    setPage('results');
  };

  const handleViewCamp = (camp: Camp) => {
    setSelectedCamp(camp);
    setPage('detail');
  };

  const handleBack = () => {
    if (page === 'detail') setPage(searchQuery ? 'results' : 'home');
    else setPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavHome = () => {
    setPage('home');
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.root}>
      <Nav onHome={handleNavHome} onSearch={handleSearch} />
      <main className={styles.main}>
        {page === 'home' && (
          <HomePage onSearch={handleSearch} onViewCamp={handleViewCamp} />
        )}
        {page === 'results' && (
          <ResultsPage query={searchQuery} onViewCamp={handleViewCamp} onSearch={handleSearch} />
        )}
        {page === 'detail' && selectedCamp && (
          <DetailPage camp={selectedCamp} onBack={handleBack} />
        )}
      </main>
    </div>
  );
}
