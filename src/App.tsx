import Header from './components/layout/Header';

function App() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Site officiel de Fizanakara
        </h1>
        <p className="text-tertiary">
          Fikambanan'ny Zanak'Anakara
        </p>
      </main>
    </div>
  );
}

export default App;