// src/pages/LMS.js
import React, { useContext } from "react";
import RequireAuth from "../utils/RequireAuth";
import { AuthContext } from "../auth/AuthContext";
import TeacherLMS from "./TeacherLMS";
import StudentLMS from "./StudentLMS";

function LMSContent() {
  const { user, authLoading } = useContext(AuthContext);

  if (authLoading) {
    return <p className="lms-entry-loading">Loading Lumino LMS…</p>;
  }

  if (!user) {
    return null; // RequireAuth handles redirect
  }

  const isTeacher = user.role === "teacher" || user.role === "admin";

  return isTeacher ? <TeacherLMS /> : <StudentLMS />;
}

export default function LMS() {
  return (
    <RequireAuth>
      <LMSContent />
    </RequireAuth>
  );
}
