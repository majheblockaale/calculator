"use client";

import { useState, useMemo } from "react";
import AdBanner from "@/components/AdBanner";

type Course = { id: number; name: string; grade: string; credits: string };

const gradePoints: Record<string, number> = {
  "A+": 4.0, "A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7,
  "D+": 1.3, "D": 1.0, "D-": 0.7,
  "F": 0.0,
};

const gradeOptions = Object.keys(gradePoints);

export default function GPACalculatorPage() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: "", grade: "A", credits: "3" },
    { id: 2, name: "", grade: "B+", credits: "3" },
    { id: 3, name: "", grade: "A-", credits: "4" },
    { id: 4, name: "", grade: "B", credits: "3" },
  ]);
  const [nextId, setNextId] = useState(5);

  // Existing GPA for cumulative calculation
  const [existingGPA, setExistingGPA] = useState("");
  const [existingCredits, setExistingCredits] = useState("");

  const addCourse = () => {
    setCourses((prev) => [...prev, { id: nextId, name: "", grade: "A", credits: "3" }]);
    setNextId((n) => n + 1);
  };

  const removeCourse = (id: number) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const updateCourse = (id: number, field: keyof Course, value: string) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const result = useMemo(() => {
    let totalPoints = 0;
    let totalCredits = 0;

    for (const course of courses) {
      const credits = parseFloat(course.credits);
      const points = gradePoints[course.grade];
      if (isNaN(credits) || credits <= 0 || points === undefined) continue;
      totalPoints += points * credits;
      totalCredits += credits;
    }

    const semesterGPA = totalCredits > 0 ? totalPoints / totalCredits : 0;

    // Cumulative
    let cumulativeGPA = semesterGPA;
    const existGPA = parseFloat(existingGPA);
    const existCred = parseFloat(existingCredits);
    if (!isNaN(existGPA) && !isNaN(existCred) && existCred > 0) {
      const existingPoints = existGPA * existCred;
      cumulativeGPA = (existingPoints + totalPoints) / (existCred + totalCredits);
    }

    return { semesterGPA, cumulativeGPA, totalCredits };
  }, [courses, existingGPA, existingCredits]);

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">GPA Calculator</h1>
        <p className="text-muted text-center mb-8">Calculate your semester and cumulative GPA.</p>

        <AdBanner slot="gpa-top" format="horizontal" className="mb-8" />

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="w-full max-w-xl mx-auto lg:mx-0">
            <div className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold mb-4">Current Semester Courses</h3>

              {/* Course headers */}
              <div className="grid grid-cols-[1fr_80px_80px_32px] gap-2 mb-2 text-xs text-muted px-1">
                <span>Course Name</span>
                <span>Grade</span>
                <span>Credits</span>
                <span></span>
              </div>

              {/* Course rows */}
              <div className="space-y-2">
                {courses.map((course) => (
                  <div key={course.id} className="grid grid-cols-[1fr_80px_80px_32px] gap-2">
                    <input
                      type="text"
                      value={course.name}
                      onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                      className="bg-display-bg border border-display-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                      placeholder="Course name"
                    />
                    <select
                      value={course.grade}
                      onChange={(e) => updateCourse(course.id, "grade", e.target.value)}
                      className="bg-display-bg border border-display-border rounded-lg px-2 py-2 text-sm focus:outline-none focus:border-primary"
                    >
                      {gradeOptions.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={course.credits}
                      onChange={(e) => updateCourse(course.id, "credits", e.target.value)}
                      className="bg-display-bg border border-display-border rounded-lg px-2 py-2 text-sm text-center focus:outline-none focus:border-primary"
                      min="0" max="12"
                    />
                    <button onClick={() => removeCourse(course.id)} className="text-muted hover:text-red-500 text-lg">×</button>
                  </div>
                ))}
              </div>

              <button onClick={addCourse} className="mt-3 w-full py-2 rounded-lg bg-btn-bg hover:bg-btn-hover text-sm font-medium transition-colors">
                + Add Course
              </button>

              {/* Existing GPA */}
              <div className="mt-6 pt-4 border-t border-card-border">
                <h4 className="text-sm font-medium mb-2">Previous GPA (for cumulative)</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted">Previous GPA</label>
                    <input type="number" step="0.01" value={existingGPA} onChange={(e) => setExistingGPA(e.target.value)}
                      className="w-full bg-display-bg border border-display-border rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-primary" placeholder="3.50" />
                  </div>
                  <div>
                    <label className="text-xs text-muted">Previous Credits</label>
                    <input type="number" value={existingCredits} onChange={(e) => setExistingCredits(e.target.value)}
                      className="w-full bg-display-bg border border-display-border rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-primary" placeholder="60" />
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center">
                  <p className="text-xs text-muted mb-1">Semester GPA</p>
                  <p className="text-3xl font-bold font-mono text-primary">{result.semesterGPA.toFixed(2)}</p>
                </div>
                <div className="bg-display-bg border border-display-border rounded-xl p-4 text-center">
                  <p className="text-xs text-muted mb-1">Cumulative GPA</p>
                  <p className="text-3xl font-bold font-mono">{result.cumulativeGPA.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Grade scale reference */}
          <div className="w-full max-w-xs mx-auto lg:mx-0 space-y-6">
            <div className="bg-card-bg border border-card-border rounded-2xl p-4">
              <h3 className="font-semibold mb-3">Grade Scale</h3>
              <div className="space-y-1">
                {gradeOptions.map((g) => (
                  <div key={g} className="flex justify-between text-sm">
                    <span className="font-medium">{g}</span>
                    <span className="text-muted font-mono">{gradePoints[g].toFixed(1)}</span>
                  </div>
                ))}
              </div>
            </div>
            <AdBanner slot="gpa-sidebar" format="rectangle" />
          </div>
        </div>

        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">How to Calculate GPA</h2>
          <p className="text-muted">
            GPA (Grade Point Average) is calculated by dividing the total grade points earned by the
            total credit hours attempted. Each letter grade has a point value (A=4.0, B=3.0, etc.)
            multiplied by the course credit hours. Add all grade points and divide by total credits.
          </p>
        </section>
      </div>
    </div>
  );
}
