import "./App.css";
import { Suspense } from "react";
import { CandidatePage } from "./features/candidates";

function App() {
	return (
		<div className="min-h-screen bg-gray-50">
			<Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
				<CandidatePage />
			</Suspense>
		</div>
	);
}

export default App;
