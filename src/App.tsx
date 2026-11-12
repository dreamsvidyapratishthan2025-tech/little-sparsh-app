import React, { useState, useEffect } from 'react';
import { 
  Users, 
  CreditCard, 
  Calendar, 
  MapPin, 
  BookOpen, 
  Gift, 
  Award, 
  TrendingUp, 
  Settings, 
  Search, 
  Plus, 
  CheckCircle, 
  XCircle, 
  Bell, 
  Truck, 
  FileText, 
  Layers, 
  Sparkles, 
  Printer, 
  Download, 
  Building, 
  Smartphone, 
  Check, 
  Edit, 
  Trash,
  ArrowRight,
  Lock,
  LogIn,
  LogOut,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

const INITIAL_GRADES = ["Playgroup", "Nursery", "LKG", "UKG", "Day Care"];

const INITIAL_STUDENTS = [
  { 
    id: "STU001", 
    name: "Aarav Amit Sharma", 
    class: "LKG", 
    fatherName: "Amit Sharma",
    motherName: "Sunita Sharma",
    parentPhone: "9876543210", 
    parentEmail: "amit@example.com",
    guardianName: "N/A",
    guardianPhone: "N/A",
    address: "Flat 402, Sunshine Residency, Sector 15, Vashi, Navi Mumbai",
    dob: "2022-05-24", 
    birthdayMonth: "05",
    status: "Admitted", 
    branch: "Little Sparsh Pre School (Vashi)",
    fees: { total: 45000, paid: 30000, term: "Term 1 Paid", discount: 5000, discountName: "Early Bird Offer" },
    transport: { usesBus: true, busNo: "BUS-01", route: "Vashi Sector 15 to School", stop: "Sunshine Residency Vashi", paid: true },
    attendance: { present: 22, total: 24 },
    improvements: { motorSkills: 85, socialSkills: 90, cognitive: 80, language: 75 },
    results: { English: "A+", Marathi: "A", Math: "O", Art: "A+" },
    parentAadhar: "111122223333"
  },
  { 
    id: "STU002", 
    name: "Ananya Sanjay Patil", 
    class: "UKG", 
    fatherName: "Sanjay Patil",
    motherName: "Megha Patil",
    parentPhone: "9123456789", 
    parentEmail: "sanjay@example.com",
    guardianName: "Ramesh Patil (Uncle)",
    guardianPhone: "9881223344",
    address: "Row House No. 5, Crystal Park, Sector 20, Kothrud, Pune",
    dob: "2021-09-12", 
    birthdayMonth: "09",
    status: "Admitted", 
    branch: "Little Sparsh Pre School (Kothrud)",
    fees: { total: 48000, paid: 24000, term: "Term 1 Paid, Term 2 Pending", discount: 2000, discountName: "Sibling Discount" },
    transport: { usesBus: true, busNo: "VAN-02", route: "Kothrud Depot to School", stop: "Crystal Park Kothrud", paid: false },
    attendance: { present: 20, total: 24 },
    improvements: { motorSkills: 90, socialSkills: 95, cognitive: 92, language: 88 },
    results: { English: "O", Marathi: "O", Math: "O", Art: "A" },
    parentAadhar: "444455556666"
  },
  { 
    id: "STU003", 
    name: "Sai Rahul Deshmukh", 
    class: "Day Care", 
    fatherName: "Rahul Deshmukh",
    motherName: "Snehal Deshmukh",
    parentPhone: "9988776655", 
    parentEmail: "rahul@example.com",
    guardianName: "N/A",
    guardianPhone: "N/A",
    address: "Sai Srushti, Sector 4, Koparkhairane, Navi Mumbai",
    dob: "2023-05-20", 
    birthdayMonth: "05",
    status: "Admitted", 
    branch: "Little Sparsh Pre School (Vashi)",
    fees: { total: 42000, paid: 15000, term: "Partial Payment", discount: 0, discountName: "None" },
    transport: { usesBus: false, busNo: "N/A", route: "N/A", stop: "N/A", paid: false },
    attendance: { present: 18, total: 24 },
    improvements: { motorSkills: 75, socialSkills: 80, cognitive: 75, language: 70 },
    results: { English: "B", Marathi: "A", Math: "B+", Art: "O" },
    parentAadhar: "777788889999"
  }
];

const INITIAL_TEACHERS = [
  { id: "T1", name: "Sushma More", role: "Class Teacher (LKG)", dob: "1992-05-19", birthdayMonth: "05", branch: "Little Sparsh Pre School (Vashi)" },
  { id: "T2", name: "Priya Kulkarni", role: "Class Teacher (UKG)", dob: "1988-10-15", birthdayMonth: "10", branch: "Little Sparsh Pre School (Kothrud)" },
  { id: "T3", name: "Kavita Shinde", role: "Nursery Coordinator", dob: "1995-05-25", birthdayMonth: "05", branch: "Little Sparsh Pre School (Vashi)" }
];

const INITIAL_FURNITURE = [
  { id: "F1", name: "Junior Dual Study Desks", category: "Classroom Furniture", stock: 35, scrap: 2, condition: "Excellent" },
  { id: "F2", name: "Multi-color Stack Chairs", category: "Classroom Furniture", stock: 90, scrap: 8, condition: "Good" },
  { id: "F3", name: "Play Area Toy Storage Bins", category: "Play Equipment", stock: 15, scrap: 1, condition: "Excellent" }
];

const INITIAL_BUS_STOPS = [
  { id: "STP1", name: "Sunshine Residency Vashi", time: "08:15 AM", type: "Bus-01" },
  { id: "STP2", name: "Koparkhairane Sector 4", time: "08:30 AM", type: "Bus-01" },
  { id: "STP3", name: "Crystal Park Kothrud", time: "08:10 AM", type: "Van-02" },
  { id: "STP4", name: "Kothrud Depot Circle", time: "08:25 AM", type: "Van-02" }
];

const INITIAL_HOMEWORKS = [
  { id: "HW1", date: "2026-05-18", class: "LKG", subject: "English", topic: "Write Alphabets A to M in red margin notebook.", status: "Assigned" },
  { id: "HW2", date: "2026-05-18", class: "UKG", subject: "Math", topic: "Single-digit Addition Worksheet No. 5.", status: "Assigned" }
];

const INITIAL_BRANCHES = [
  { id: "B1", city: "Navi Mumbai", area: "Vashi", schoolName: "Little Sparsh Pre School (Vashi)", sansthaName: "Sparsh Shikshan Sanstha" },
  { id: "B2", city: "Pune", area: "Kothrud", schoolName: "Little Sparsh Pre School (Kothrud)", sansthaName: "Sparsh Shikshan Sanstha" }
];

const INITIAL_INQUIRIES = [
  {
    id: "INQ001",
    name: "Manasvi Sawant",
    class: "Nursery",
    fatherName: "Vijay Sawant",
    motherName: "Sadhana Sawant",
    parentPhone: "9820123456",
    address: "Sector 17, Vashi, Navi Mumbai",
    date: "2026-05-10",
    stage: "Leads/Inquiries", 
    docs: { birthCertificate: true, addressProof: false, parentAadhar: false, formFilled: true, undertakingSigned: false, photoSubmitted: false, healthForm: false }
  },
  {
    id: "INQ002",
    name: "Arnav Ganesh More",
    class: "LKG",
    fatherName: "Ganesh More",
    motherName: "Lalita More",
    parentPhone: "9930456789",
    address: "Kothrud Depot, Pune",
    date: "2026-05-12",
    stage: "Parents Interaction & Docs Verify",
    docs: { birthCertificate: true, addressProof: true, parentAadhar: false, formFilled: true, undertakingSigned: true, photoSubmitted: true, healthForm: false }
  }
];

const INITIAL_FUTURE_BRANCHES = [
  { id: "FB1", city: "Thane", area: "Ghodbunder Road", proposedYear: "2027", likes: 45 },
  { id: "FB2", city: "Navi Mumbai", area: "Kharghar", proposedYear: "2027", likes: 78 }
];

const INITIAL_ACCOUNTS = [
  { id: "ACC001", role: "Trustee", username: "TRU@01", password: "TRU01", status: "Active" },
  { id: "ACC002", role: "Trustee", username: "TRU02", password: "TRU02", status: "Active" },
  { id: "ACC003", role: "Coordinator", username: "CO01", password: "CO01", status: "Active" },
  { id: "ACC004", role: "Coordinator", username: "CO02", password: "CO02", status: "Active" },
  { id: "ACC005", role: "Clerk", username: "CLE01", password: "CLE01", status: "Active" },
  { id: "ACC006", role: "Class Teacher", username: "TEA@SUSHMA", password: "teacher123", status: "Active" },
  { id: "ACC007", role: "Parent", username: "111122223333", password: "1234", status: "Active" },
  { id: "ACC008", role: "Parent", username: "444455556666", password: "1234", status: "Active" },
  { id: "ACC009", role: "Parent", username: "777788889999", password: "1234", status: "Active" }
];

export default function App() {
  // Login states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState("Trustee"); 
  const [loginError, setLoginError] = useState("");
  const [userAccounts, setUserAccounts] = useState(INITIAL_ACCOUNTS);

  // Forgotten credential states
  const [forgotOptionActive, setForgotOptionActive] = useState(false);
  const [forgotMobileNum, setForgotMobileNum] = useState("");
  const [forgotOtpSent, setForgotOtpSent] = useState(false);
  const [forgotOtpEntered, setForgotOtpEntered] = useState("");
  const [otpError, setOtpError] = useState("");
  const [newTrusteePassword, setNewTrusteePassword] = useState("");
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);

  // Dynamic state values
  const [currentBranch, setCurrentBranch] = useState(INITIAL_BRANCHES[0]); 
  const [schoolLogo, setSchoolLogo] = useState("https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3");
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Dynamic Grades State
  const [grades, setGrades] = useState(INITIAL_GRADES);
  const [newGradeName, setNewGradeName] = useState("");
  const [selectedGradeFilter, setSelectedGradeFilter] = useState("All");
  
  // Dynamic Subject Categories State
  const [subjects, setSubjects] = useState(["English", "Marathi", "Math", "Art"]);
  const [newSubjectName, setNewSubjectName] = useState("");
  
  // Promotion Module States
  const [promoteFromClass, setPromoteFromClass] = useState("LKG");
  const [promoteToClass, setPromoteToClass] = useState("UKG");
  const [selectedStudentsForPromotion, setSelectedStudentsForPromotion] = useState({});

  // Ex-Students State (Alumni database)
  const [exStudents, setExStudents] = useState([]);

  // Granular attendance configuration
  const [attendanceClassFilter, setAttendanceClassFilter] = useState("LKG");

  // Granular Results Release Config
  const [resultsReleased, setResultsReleased] = useState(false);
  const [editStudentGradesId, setEditStudentGradesId] = useState(null);
  const [editGradesData, setEditGradesData] = useState({});

  // Parents direct chat box logs
  const [selectedParentChildId, setSelectedParentChildId] = useState("STU001");
  const [parentChatMsg, setParentChatMsg] = useState("");
  const [parentChats, setParentChats] = useState([
    { sender: "School", text: "Welcome parents! Today we had a clay modeling session." }
  ]);

  // Transportation Stops
  const [busStops, setBusStops] = useState(INITIAL_BUS_STOPS);
  const [newStopName, setNewStopName] = useState("");
  const [newStopTime, setNewStopTime] = useState("");
  const [newStopVehicle, setNewStopVehicle] = useState("Bus-01");

  // GPS Tracking Authorization Toggle
  const [liveTrackingAccessAllowed, setLiveTrackingAccessAllowed] = useState(true);

  const [permissions, setPermissions] = useState({
    "Coordinator": {
      schoolData: true,
      studentDetails: true,
      admissions: true,
      fees: true,
      finance: true,
      furniture: true,
      attendance: true,
      homework: true,
      transport: true,
      results: true,
      progress: true,
      suggestions: true,
      enterEditGrades: true,
      releaseMarks: true,
      viewResults: true
    },
    "Clerk": {
      schoolData: true,
      studentDetails: true,
      admissions: true,
      fees: true,
      finance: true,
      furniture: true,
      attendance: true,
      homework: true,
      transport: true,
      results: false,
      progress: false,
      suggestions: true,
      enterEditGrades: false,
      releaseMarks: false,
      viewResults: true
    },
    "Class Teacher": {
      schoolData: true,
      studentDetails: true,
      admissions: false,
      fees: true,
      finance: false,
      furniture: false,
      attendance: true,
      homework: true,
      transport: true,
      results: true,
      progress: true,
      suggestions: true,
      enterEditGrades: true,
      releaseMarks: false,
      viewResults: true
    },
    "Subject Teacher": {
      schoolData: true,
      studentDetails: false,
      admissions: false,
      fees: false,
      finance: false,
      furniture: false,
      attendance: true,
      homework: true,
      transport: false,
      results: true,
      progress: true,
      suggestions: false,
      enterEditGrades: true,
      releaseMarks: false,
      viewResults: true
    },
    "Parent": {
      schoolData: false,
      studentDetails: false,
      admissions: false,
      fees: true, 
      finance: false, 
      furniture: false,
      attendance: true,
      homework: true,
      transport: true,
      results: true,
      progress: true,
      suggestions: true,
      enterEditGrades: false,
      releaseMarks: false,
      viewResults: true 
    }
  });

  // Master Lists States
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [teachers, setTeachers] = useState(INITIAL_TEACHERS);
  const [furniture, setFurniture] = useState(INITIAL_FURNITURE);
  const [homeworks, setHomeworks] = useState(INITIAL_HOMEWORKS);
  const [branches, setBranches] = useState(INITIAL_BRANCHES);
  const [inquiries, setInquiries] = useState(INITIAL_INQUIRIES);
  const [futureBranches, setFutureBranches] = useState(INITIAL_FUTURE_BRANCHES);

  // Form Inputs State (Now integrated directly in Admissions Process tab)
  const [newStudent, setNewStudent] = useState({
    name: "", 
    class: "LKG", 
    fatherName: "", 
    motherName: "", 
    parentPhone: "", 
    parentEmail: "",
    guardianName: "",
    guardianPhone: "",
    address: "", 
    dob: "", 
    discount: 0, 
    discountName: "None", 
    usesBus: false, 
    busNo: "BUS-01",
    assignedStop: "Sunshine Residency Vashi",
    parentAadhar: ""
  });
  
  const [newFurniture, setNewFurniture] = useState({ name: "", category: "Classroom Furniture", stock: 0, scrap: 0, condition: "Excellent" });
  const [newHomework, setNewHomework] = useState({ class: "LKG", subject: "Math", topic: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [sentMessageNotify, setSentMessageNotify] = useState(null);
  const [wishPersona, setWishPersona] = useState(null);

  // User credential management temporary states
  const [selectedUserToReset, setSelectedUserToReset] = useState("");
  const [resetNewUsername, setResetNewUsername] = useState("");
  const [resetNewPassword, setResetNewPassword] = useState("");

  // Custom modal states to avoid native alerts and confirms
  const [showCustomRevertModal, setShowCustomRevertModal] = useState(false);
  const [studentToRevert, setStudentToRevert] = useState(null);

  const [editingBranchName, setEditingBranchName] = useState("");
  const [editingSansthaName, setEditingSansthaName] = useState("");

  useEffect(() => {
    setEditingBranchName(currentBranch.schoolName);
    setEditingSansthaName(currentBranch.sansthaName);
  }, [currentBranch]);

  const handleLogin = (e) => {
    e.preventDefault();
    const u = username.trim().toUpperCase();
    const p = password;

    // Series validation based on credentials array to prevent login to incorrect categories
    const account = userAccounts.find(acc => acc.username.toUpperCase() === u && acc.password === p);

    if (account) {
      if (account.status === "Locked") {
        setLoginError("This account is currently locked! Please contact an administrator to reset it.");
        return;
      }
      setCurrentUserRole(account.role);
      setIsLoggedIn(true);
      setLoginError("");
      if (account.role === "Parent") {
        setActiveTab("parent-dashboard");
      } else {
        setActiveTab("dashboard");
      }
    } else {
      // Direct series rules validation hints for users to login correctly
      if (u.startsWith("TRU") && !account) {
        setLoginError("Invalid Trustee Credentials! Check TRU username series and password.");
      } else if (u.startsWith("CO") && !account) {
        setLoginError("Invalid Coordinator Credentials! Check CO username series and password.");
      } else if (u.startsWith("CLE") && !account) {
        setLoginError("Invalid Clerk Credentials! Check CLE username series and password.");
      } else if (u.startsWith("TEA") && !account) {
        setLoginError("Invalid Teacher Credentials! Check TEA username series and password.");
      } else if (/^\d{12}$/.test(u) && !account) {
        setLoginError("Invalid Parent Aadhar login credential series or password mismatch!");
      } else {
        setLoginError("Access Denied! Use correct ID series provided by School Management.");
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setLoginError("");
  };

  const handleSendRecoveryOtp = () => {
    if (!forgotMobileNum.trim()) {
      setOtpError("Please enter your registered Trustee recovery phone number.");
      return;
    }
    setForgotOtpSent(true);
    setOtpError("");
    setSentMessageNotify("Simulated OTP '123456' has been sent to your Trustee recovery mobile number.");
    setTimeout(() => setSentMessageNotify(null), 5000);
  };

  const handleVerifyOtpAndReset = () => {
    if (forgotOtpEntered !== "123456") {
      setOtpError("Invalid OTP Code! Please enter '123456' to proceed.");
      return;
    }
    if (!newTrusteePassword.trim()) {
      setOtpError("Please specify a strong new password.");
      return;
    }
    // Update Trustee passwords in active accounts database
    const updated = userAccounts.map(acc => {
      if (acc.role === "Trustee") {
        return { ...acc, password: newTrusteePassword };
      }
      return acc;
    });
    setUserAccounts(updated);
    setPasswordResetSuccess(true);
    setOtpError("");
    setSentMessageNotify("Trustee password reset completed successfully!");
    setTimeout(() => {
      setForgotOptionActive(false);
      setForgotOtpSent(false);
      setForgotOtpEntered("");
      setForgotMobileNum("");
      setNewTrusteePassword("");
      setPasswordResetSuccess(false);
      setSentMessageNotify(null);
    }, 3000);
  };

  const handleResetUserCredentials = (e) => {
    e.preventDefault();
    if (!selectedUserToReset || !resetNewUsername.trim() || !resetNewPassword.trim()) {
      setSentMessageNotify("Please fill in all details to reset credentials!");
      setTimeout(() => setSentMessageNotify(null), 3000);
      return;
    }

    // Role Series Enforcement during reset
    const userAcc = userAccounts.find(acc => acc.id === selectedUserToReset);
    const prefix = userAcc.role === "Trustee" ? "TRU" :
                   userAcc.role === "Coordinator" ? "CO" :
                   userAcc.role === "Clerk" ? "CLE" :
                   userAcc.role === "Class Teacher" || userAcc.role === "Subject Teacher" ? "TEA" : "";

    const updatedUsername = resetNewUsername.trim().toUpperCase();
    if (prefix && !updatedUsername.startsWith(prefix)) {
      setSentMessageNotify(`Reset Cancelled! Username for ${userAcc.role} must start with ${prefix} series prefix.`);
      setTimeout(() => setSentMessageNotify(null), 4000);
      return;
    }

    const updated = userAccounts.map(acc => {
      if (acc.id === selectedUserToReset) {
        return { ...acc, username: updatedUsername, password: resetNewPassword, status: "Active" };
      }
      return acc;
    });

    setUserAccounts(updated);
    setSelectedUserToReset("");
    setResetNewUsername("");
    setResetNewPassword("");
    setSentMessageNotify("Account Login & Password Series Reset Completed Successfully!");
    setTimeout(() => setSentMessageNotify(null), 3500);
  };

  const hasAccess = (moduleName, checkRole = currentUserRole) => {
    if (checkRole === "Trustee") return true; 
    return permissions[checkRole]?.[moduleName] ?? false;
  };

  const togglePermission = (role, moduleName) => {
    if (currentUserRole !== "Trustee") return;
    setPermissions(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [moduleName]: !prev[role][moduleName]
      }
    }));
  };

  const handleAddGrade = (e) => {
    e.preventDefault();
    if (!newGradeName.trim()) return;
    if (grades.includes(newGradeName.trim())) {
      setSentMessageNotify("This Grade sector already exists!");
      return;
    }
    setGrades([...grades, newGradeName.trim()]);
    setNewGradeName("");
    setSentMessageNotify("New Grade Sector added successfully across App!");
    setTimeout(() => setSentMessageNotify(null), 3000);
  };

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (!newSubjectName.trim()) return;
    const cleanSubj = newSubjectName.trim();
    if (subjects.includes(cleanSubj)) {
      setSentMessageNotify("This Subject already exists!");
      return;
    }
    setSubjects([...subjects, cleanSubj]);
    setNewSubjectName("");
    setSentMessageNotify(`New Subject category "${cleanSubj}" added successfully!`);
    setTimeout(() => setSentMessageNotify(null), 3000);
  };

  const handleRemoveSubject = (subjToRemove) => {
    setSubjects(subjects.filter(s => s !== subjToRemove));
    setSentMessageNotify(`Subject category "${subjToRemove}" removed.`);
    setTimeout(() => setSentMessageNotify(null), 3000);
  };

  const handleAddBusStop = (e) => {
    e.preventDefault();
    if (!newStopName.trim() || !newStopTime.trim()) return;
    const added = {
      id: `STP${busStops.length + 1}`,
      name: newStopName.trim(),
      time: newStopTime,
      type: newStopVehicle
    };
    setBusStops([...busStops, added]);
    setNewStopName("");
    setNewStopTime("");
    setSentMessageNotify("Bus stop information updated successfully!");
    setTimeout(() => setSentMessageNotify(null), 3000);
  };

  const handleRemoveBusStop = (id) => {
    setBusStops(busStops.filter(s => s.id !== id));
  };

  const handleSaveGrades = (studentId) => {
    const updatedStudents = students.map(st => {
      if (st.id === studentId) {
        return {
          ...st,
          results: {
            ...st.results,
            ...editGradesData
          }
        };
      }
      return st;
    });
    setStudents(updatedStudents);
    setEditStudentGradesId(null);
    setEditGradesData({});
    setSentMessageNotify("Grades recorded successfully!");
    setTimeout(() => setSentMessageNotify(null), 3000);
  };

  const exportDataCSV = (dataType) => {
    let headers = '';
    let rows = [];
    let filename = '';

    if (dataType === 'students') {
      headers = 'ID,Name,Class,Father,Mother,Phone,Branch,Transport,Fees Paid,Fees Total,Balance\n';
      rows = students.map(s => `"${s.id}","${s.name}","${s.class}","${s.fatherName}","${s.motherName}","${s.parentPhone}","${s.branch}","${s.transport.usesBus ? s.transport.busNo : 'No'}",${s.fees.paid},${s.fees.total},${s.fees.total - s.fees.paid - s.fees.discount}`);
      filename = 'students_register.csv';
    } else if (dataType === 'finance') {
      headers = 'Student ID,Student Name,Class,Total Fee,Discount Granted,Paid Amount,Remaining Balance\n';
      rows = students.map(s => `"${s.id}","${s.name}","${s.class}",${s.fees.total},${s.fees.discount},${s.fees.paid},${s.fees.total - s.fees.paid - s.fees.discount}`);
      filename = 'finance_ledger.csv';
    }

    const csvContent = "data:text/csv;charset=utf-8," + headers + rows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const triggerPrintPage = () => {
    window.print();
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.fatherName || !newStudent.motherName || !newStudent.parentPhone || !newStudent.parentAadhar) {
      setSentMessageNotify("Please fill in all mandatory fields (marked with *), including Parent Aadhar Number!");
      setTimeout(() => setSentMessageNotify(null), 4000);
      return;
    }

    if (!/^\d{12}$/.test(newStudent.parentAadhar)) {
      setSentMessageNotify("Validation Error! Parent Aadhar Number must be exactly 12 numeric digits.");
      setTimeout(() => setSentMessageNotify(null), 4000);
      return;
    }
    
    const calculatedTotal = newStudent.class === "Day Care" ? 50000 : 45000;
    const birthdayMonth = newStudent.dob ? newStudent.dob.split('-')[1] : "05";
    const generatedStuId = `STU${String(students.length + 1).padStart(3, '0')}`;

    const added = {
      id: generatedStuId,
      name: newStudent.name,
      class: newStudent.class,
      fatherName: newStudent.fatherName,
      motherName: newStudent.motherName,
      parentPhone: newStudent.parentPhone,
      parentEmail: newStudent.parentEmail || "parent@gmail.com",
      guardianName: newStudent.guardianName || "N/A",
      guardianPhone: newStudent.guardianPhone || "N/A",
      address: newStudent.address || "N/A",
      dob: newStudent.dob || "2022-05-18",
      birthdayMonth: birthdayMonth,
      status: "Admitted",
      branch: currentBranch.schoolName,
      fees: {
        total: calculatedTotal,
        paid: 10000, // standard registration fee paid
        term: "Admission Fee Paid",
        discount: Number(newStudent.discount),
        discountName: newStudent.discountName
      },
      transport: {
        usesBus: newStudent.usesBus,
        busNo: newStudent.usesBus ? newStudent.busNo : "N/A",
        route: newStudent.usesBus ? `${newStudent.assignedStop} route` : "N/A",
        stop: newStudent.usesBus ? newStudent.assignedStop : "N/A",
        paid: false
      },
      attendance: { present: 0, total: 10 },
      improvements: { motorSkills: 70, socialSkills: 75, cognitive: 70, language: 65 },
      results: {},
      parentAadhar: newStudent.parentAadhar
    };

    // Create default parent account dynamically in login list
    const generatedParentAcc = {
      id: `ACC${String(userAccounts.length + 1).padStart(3, '0')}`,
      role: "Parent",
      username: newStudent.parentAadhar,
      password: "1234",
      status: "Active"
    };

    setStudents([...students, added]);
    setUserAccounts([...userAccounts, generatedParentAcc]);

    setNewStudent({
      name: "", class: "LKG", fatherName: "", motherName: "", parentPhone: "", parentEmail: "",
      guardianName: "", guardianPhone: "", address: "", dob: "", discount: 0, discountName: "None", usesBus: false, busNo: "BUS-01", assignedStop: "Sunshine Residency Vashi", parentAadhar: ""
    });
    setSentMessageNotify(`Student admitted successfully! Default Parent Account created. (Username: ${added.parentAadhar}, Password: 1234)`);
    setTimeout(() => setSentMessageNotify(null), 6000);
  };

  const handleAddHomework = (e) => {
    e.preventDefault();
    if (!newHomework.topic) return;
    const added = {
      id: `HW${homeworks.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      class: newHomework.class,
      subject: newHomework.subject,
      topic: newHomework.topic,
      status: "Assigned"
    };
    setHomeworks([added, ...homeworks]);
    setNewHomework({ ...newHomework, topic: "" });
    setSentMessageNotify("Homework task published to diary successfully!");
    setTimeout(() => setSentMessageNotify(null), 3000);
  };

  const handleUpdateBranchInfo = () => {
    if (currentUserRole !== "Trustee") return;
    const updatedBranches = branches.map(b => {
      if (b.id === currentBranch.id) {
        return { ...b, schoolName: editingBranchName, sansthaName: editingSansthaName };
      }
      return b;
    });
    setBranches(updatedBranches);
    setCurrentBranch({ ...currentBranch, schoolName: editingBranchName, sansthaName: editingSansthaName });
    setSentMessageNotify("School Branch Info and Title updated successfully!");
    setTimeout(() => setSentMessageNotify(null), 3000);
  };

  const handleAddNewBranch = () => {
    if (currentUserRole !== "Trustee") return;
    const cityName = prompt("Enter City Name (e.g. Mumbai):");
    const areaName = prompt("Enter Area Name (e.g. Dadar):");
    if (!cityName || !areaName) return;
    const newB = {
      id: `B${branches.length + 1}`,
      city: cityName,
      area: areaName,
      schoolName: `Little Sparsh Pre School (${areaName})`,
      sansthaName: currentBranch.sansthaName
    };
    setBranches([...branches, newB]);
    setSentMessageNotify("New city/area branch registered!");
    setTimeout(() => setSentMessageNotify(null), 3000);
  };

  const toggleDocCheck = (id, key) => {
    setInquiries(prev => prev.map(inq => {
      if (inq.id === id) {
        return {
          ...inq,
          docs: {
            ...inq.docs,
            [key]: !inq.docs[key]
          }
        };
      }
      return inq;
    }));
  };

  const changeInquiryStage = (id, newStage) => {
    setInquiries(prev => prev.map(inq => {
      if (inq.id === id) {
        return { ...inq, stage: newStage };
      }
      return inq;
    }));
    setSentMessageNotify(`Inquiry stage updated to: ${newStage}`);
    setTimeout(() => setSentMessageNotify(null), 2500);
  };

  const handleApproveInquiry = (inq) => {
    const isAlreadyRegistered = students.some(s => s.name === inq.name);
    if (isAlreadyRegistered) {
      setSentMessageNotify("Student is already active in database!");
      setTimeout(() => setSentMessageNotify(null), 3000);
      return;
    }

    const parentAadharMock = `9999${String(Math.floor(10000000 + Math.random() * 90000000))}`;
    const createdStudent = {
      id: `STU${String(students.length + 1).padStart(3, '0')}`,
      name: inq.name,
      class: inq.class,
      fatherName: inq.fatherName,
      motherName: inq.motherName,
      parentPhone: inq.parentPhone,
      parentEmail: "parent@gmail.com",
      guardianName: "N/A",
      guardianPhone: "N/A",
      address: inq.address,
      dob: "2022-05-18",
      birthdayMonth: "05",
      status: "Admitted",
      branch: currentBranch.schoolName,
      fees: { total: 45000, paid: 10000, term: "Admission Fee Paid", discount: 0, discountName: "None" },
      transport: { usesBus: false, busNo: "N/A", route: "N/A", stop: "N/A", paid: false },
      attendance: { present: 0, total: 10 },
      improvements: { motorSkills: 70, socialSkills: 70, cognitive: 70, language: 70 },
      results: {},
      parentAadhar: parentAadharMock
    };

    // Create default parent login series
    const generatedParentAcc = {
      id: `ACC${String(userAccounts.length + 1).padStart(3, '0')}`,
      role: "Parent",
      username: parentAadharMock,
      password: "1234",
      status: "Active"
    };

    setStudents([...students, createdStudent]);
    setUserAccounts([...userAccounts, generatedParentAcc]);
    setInquiries(prev => prev.filter(i => i.id !== inq.id));
    setSentMessageNotify(`Admitted "${inq.name}"! Parent Login Generated: Username: ${parentAadharMock}, Password: 1234`);
    setTimeout(() => setSentMessageNotify(null), 6000);
  };

  const handleDeclineInquiry = (id) => {
    setInquiries(prev => prev.map(inq => {
      if (inq.id === id) {
        return { ...inq, stage: "Declined" };
      }
      return inq;
    }));
    setSentMessageNotify("Inquiry marked as Declined.");
    setTimeout(() => setSentMessageNotify(null), 2500);
  };

  const handleDeleteInquiry = (id) => {
    setInquiries(prev => prev.filter(i => i.id !== id));
    setSentMessageNotify("Inquiry record permanently removed.");
    setTimeout(() => setSentMessageNotify(null), 2500);
  };

  const handleRevertAdmissionConfirm = () => {
    if (!studentToRevert) return;
    
    // Create new pipeline inquiry from reverted student
    const revertedInquiry = {
      id: `INQ${String(inquiries.length + 1).padStart(3, '0')}`,
      name: studentToRevert.name,
      class: studentToRevert.class,
      fatherName: studentToRevert.fatherName,
      motherName: studentToRevert.motherName,
      parentPhone: studentToRevert.parentPhone,
      address: studentToRevert.address,
      date: new Date().toISOString().split('T')[0],
      stage: "Parents Interaction & Docs Verify",
      docs: { birthCertificate: true, addressProof: true, parentAadhar: true, formFilled: true, undertakingSigned: true, photoSubmitted: true, healthForm: true }
    };

    setInquiries([...inquiries, revertedInquiry]);
    setStudents(students.filter(s => s.id !== studentToRevert.id));
    setShowCustomRevertModal(false);
    setStudentToRevert(null);
    setSentMessageNotify("Admission reverted! Student is back in verification pipeline stage.");
    setTimeout(() => setSentMessageNotify(null), 4000);
  };

  const handleToggleStudentSelectionForPromotion = (studentId) => {
    setSelectedStudentsForPromotion(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };

  const handlePromoteStudentsNow = () => {
    const idsToPromote = Object.keys(selectedStudentsForPromotion).filter(id => selectedStudentsForPromotion[id]);
    if (idsToPromote.length === 0) {
      setSentMessageNotify("Please select at least one student to promote!");
      setTimeout(() => setSentMessageNotify(null), 3000);
      return;
    }

    if (promoteToClass === "Leave School") {
      // Migrate selected students to Ex-Students registry
      const studentsToMove = students.filter(st => idsToPromote.includes(st.id));
      const aadharsToRemove = studentsToMove.map(st => st.parentAadhar);

      setExStudents([...exStudents, ...studentsToMove]);
      setStudents(students.filter(st => !idsToPromote.includes(st.id)));

      // SECURITY CRITICAL RULE: Dynamically delete or lock parent's account from login list on leaving school
      const cleanedAccounts = userAccounts.filter(acc => !aadharsToRemove.includes(acc.username));
      setUserAccounts(cleanedAccounts);

      setSentMessageNotify(`Successfully moved ${idsToPromote.length} students to "Schools Ex Students" register and disabled associated Parents login accounts.`);
    } else {
      // Regular upgrade to next class
      const updated = students.map(st => {
        if (idsToPromote.includes(st.id)) {
          return { ...st, class: promoteToClass };
        }
        return st;
      });
      setStudents(updated);
      setSentMessageNotify(`Successfully promoted ${idsToPromote.length} students to ${promoteToClass}!`);
    }

    setSelectedStudentsForPromotion({});
    setTimeout(() => setSentMessageNotify(null), 5000);
  };

  const handleVoteFutureBranch = (id) => {
    const updated = futureBranches.map(fb => {
      if (fb.id === id) {
        return { ...fb, likes: fb.likes + 1 };
      }
      return fb;
    });
    setFutureBranches(updated);
    setSentMessageNotify("Thank you! Your response has been recorded.");
    setTimeout(() => setSentMessageNotify(null), 2500);
  };

  // Filter students based on role, branch, grade selection, and search query
  const displayStudents = students.filter(s => {
    const matchesBranch = currentUserRole === "Trustee" ? true : s.branch === currentBranch.schoolName;
    const matchesGrade = selectedGradeFilter === "All" ? true : s.class === selectedGradeFilter;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.fatherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.class.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBranch && matchesGrade && matchesSearch;
  });

  // Dynamic filter logic for Parents
  // Look up associated child dynamically from Aadhar Number
  const parentsAssociatedChild = students.find(st => st.parentAadhar === username);
  const activeChildObj = parentsAssociatedChild || students[0];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl border-4 border-slate-950 overflow-hidden">
          
          {/* Header */}
          <div className="bg-slate-900 text-white p-6 text-center border-b-4 border-orange-500">
            <div className="bg-orange-500 w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-3 shadow-md">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-[11px] font-semibold text-slate-300 tracking-wider block">DREAMS VIDYA PRATISHTHAN'S</span>
            <h1 className="text-xl font-black uppercase tracking-tight text-white mt-0.5">Little SPARSH Pre School</h1>
            <p className="text-xs text-orange-400 font-extrabold uppercase mt-1">Rooted in Values, Rising with Dreams</p>
          </div>

          <div className="p-6 space-y-4">
            
            {/* DEMO ACCOUNTS HELPER PANEL */}
            <div className="bg-slate-50 p-3.5 rounded-xl border space-y-1.5 text-xs text-slate-700">
              <p className="font-extrabold text-slate-950 uppercase text-[10px] tracking-wider mb-1">🔑 Login Series System (Quick Copy Demo Users):</p>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <button 
                  onClick={() => { setUsername("TRU@01"); setPassword("TRU01"); }}
                  className="bg-slate-900 hover:bg-slate-950 text-white p-1.5 rounded text-[10px] font-bold text-left"
                >
                  Trustee 1: TRU@01
                </button>
                <button 
                  onClick={() => { setUsername("TRU02"); setPassword("TRU02"); }}
                  className="bg-slate-900 hover:bg-slate-950 text-white p-1.5 rounded text-[10px] font-bold text-left"
                >
                  Trustee 2: TRU02
                </button>
                <button 
                  onClick={() => { setUsername("CO01"); setPassword("CO01"); }}
                  className="bg-blue-900 hover:bg-blue-950 text-white p-1.5 rounded text-[10px] font-bold text-left"
                >
                  Coordinator: CO01
                </button>
                <button 
                  onClick={() => { setUsername("CLE01"); setPassword("CLE01"); }}
                  className="bg-amber-700 hover:bg-amber-800 text-white p-1.5 rounded text-[10px] font-bold text-left"
                >
                  Clerk: CLE01
                </button>
                <button 
                  onClick={() => { setUsername("TEA@SUSHMA"); setPassword("teacher123"); }}
                  className="bg-orange-500 hover:bg-orange-600 text-white p-1.5 rounded text-[10px] font-bold text-left"
                >
                  Teacher: TEA@SUSHMA
                </button>
                <button 
                  onClick={() => { setUsername("111122223333"); setPassword("1234"); }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white p-1.5 rounded text-[10px] font-bold text-left"
                >
                  Parent: 111122223333
                </button>
              </div>
            </div>

            {/* FORGOT PASSWORD FORM SHEET */}
            {forgotOptionActive ? (
              <div className="space-y-3 bg-orange-50/50 p-4 rounded-xl border border-orange-150 animate-fade-in">
                <h3 className="font-extrabold text-xs text-slate-900 uppercase">Trustee Recovery Wizard</h3>
                
                {!forgotOtpSent ? (
                  <div className="space-y-3">
                    <p className="text-[11px] text-slate-600">Enter your Trustee registered mobile number to request validation key.</p>
                    <input 
                      type="tel" 
                      placeholder="e.g. 9876543210" 
                      className="w-full p-2 bg-white border rounded text-xs outline-none font-bold"
                      value={forgotMobileNum}
                      onChange={(e) => setForgotMobileNum(e.target.value)}
                    />
                    <div className="flex justify-between items-center pt-1">
                      <button onClick={() => setForgotOptionActive(false)} className="text-xs text-slate-500 font-bold hover:underline">Cancel</button>
                      <button onClick={handleSendRecoveryOtp} className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded">Send OTP Recovery Code</button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-[11px] text-slate-600">Enter OTP code '123456' and specify your new Trustee password.</p>
                    
                    <input 
                      type="text" 
                      placeholder="Enter verification OTP code" 
                      className="w-full p-2 bg-white border rounded text-xs font-mono"
                      value={forgotOtpEntered}
                      onChange={(e) => setForgotOtpEntered(e.target.value)}
                    />

                    <input 
                      type="password" 
                      placeholder="Specify New Password" 
                      className="w-full p-2 bg-white border rounded text-xs"
                      value={newTrusteePassword}
                      onChange={(e) => setNewTrusteePassword(e.target.value)}
                    />

                    {otpError && <p className="text-red-600 font-bold text-[10px]">{otpError}</p>}

                    <div className="flex justify-between items-center pt-1">
                      <button onClick={() => setForgotOtpSent(false)} className="text-xs text-slate-500 font-bold hover:underline">Change Mobile</button>
                      <button onClick={handleVerifyOtpAndReset} className="bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded">Confirm password reset</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Username (Required Series Prefix)</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. TRU... / CO... / TEA... / Parent Aadhar" 
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold uppercase focus:ring-1 focus:ring-orange-500 outline-none"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Password</label>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    placeholder="••••••••" 
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-1 focus:ring-orange-500 outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="showPasswordCheck" 
                      className="h-4 w-4 text-orange-500 cursor-pointer"
                      checked={showPassword} 
                      onChange={() => setShowPassword(!showPassword)} 
                    />
                    <label htmlFor="showPasswordCheck" className="text-xs font-bold text-slate-600 cursor-pointer select-none">
                      Show Password
                    </label>
                  </div>

                  <button 
                    type="button" 
                    onClick={() => setForgotOptionActive(true)}
                    className="text-xs text-orange-500 font-bold hover:underline"
                  >
                    Forgot Trustee Key?
                  </button>
                </div>

                {loginError && (
                  <p className="text-red-600 font-bold text-xs text-center">{loginError}</p>
                )}

                <button 
                  type="submit" 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold p-3 rounded-2xl transition flex items-center justify-center space-x-2"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Log In Securely</span>
                </button>
              </form>
            )}

          </div>

          <div className="bg-slate-900 p-4 text-center text-[10px] text-slate-400 border-t border-slate-800">
            Little Sparsh Pre School © 2026 Admin Portal
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-start p-2 sm:p-4 font-sans print:p-0">
      
      {/* Main App Canvas */}
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-3xl border-4 border-slate-950 overflow-hidden flex flex-col min-h-[92vh] print:border-0 print:shadow-none print:rounded-none">
        
        {/* TOP STATUS BAR */}
        <div className="bg-slate-900 text-white px-4 py-3 sm:px-6 flex flex-col sm:flex-row justify-between items-center border-b-4 border-orange-500 print:hidden">
          
          <div className="flex items-center space-x-3 mb-3 sm:mb-0">
            <div className="bg-orange-500 p-2 rounded-2xl flex items-center justify-center shadow-md animate-pulse">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-[10px] font-semibold text-slate-300 tracking-wider block">DREAMS VIDYA PRATISHTHAN'S</span>
              <h1 className="text-base font-bold tracking-tight text-white uppercase">Little SPARSH Pre School</h1>
              <p className="text-[10px] text-orange-500 font-extrabold tracking-wider uppercase">Rooted in Values, Rising with Dreams</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            
            <div className="flex items-center space-x-1 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <Smartphone className="h-3.5 w-3.5 text-orange-400" />
              <span className="text-[10px] font-bold text-slate-300">Logged As:</span>
              <span className="text-[11px] text-white font-extrabold uppercase">{currentUserRole}</span>
            </div>

            {/* If parent logged in, lock their view to branch associated with child */}
            {currentUserRole === "Parent" ? (
              <div className="flex items-center space-x-1 bg-blue-900 px-3 py-1 rounded-full border border-blue-700 text-white text-[10px] font-extrabold uppercase">
                🏫 {activeChildObj.branch}
              </div>
            ) : (
              currentUserRole === "Trustee" && (
                <div className="flex items-center space-x-1 bg-blue-900 px-3 py-1 rounded-full border border-blue-700">
                  <Building className="h-3.5 w-3.5 text-orange-300" />
                  <span className="text-[10px] font-bold text-slate-100">Select Branch:</span>
                  <select 
                    className="bg-transparent text-[11px] text-white font-extrabold focus:outline-none cursor-pointer"
                    value={currentBranch.id}
                    onChange={(e) => {
                      const sel = branches.find(b => b.id === e.target.value);
                      if (sel) setCurrentBranch(sel);
                    }}
                  >
                    {branches.map(b => (
                      <option key={b.id} value={b.id} className="bg-blue-950 text-white">
                        {b.city} - {b.area}
                      </option>
                    ))}
                  </select>
                </div>
              )
            )}

            <button 
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-2.5 py-1 rounded-full text-[10px] font-extrabold text-white flex items-center space-x-1"
            >
              <LogOut className="h-3 w-3" />
              <span>Logout</span>
            </button>
          </div>

        </div>

        {/* NOTIFICATIONS BANNER */}
        {sentMessageNotify && (
          <div className="bg-orange-50 border-b-2 border-orange-200 px-4 py-2.5 flex items-center justify-between text-xs animate-pulse print:hidden">
            <div className="flex items-center space-x-2 text-slate-800">
              <span className="h-2 w-2 rounded-full bg-orange-500 inline-block"></span>
              <span className="font-bold">{sentMessageNotify}</span>
            </div>
            <button onClick={() => setSentMessageNotify(null)} className="text-slate-400 hover:text-slate-700 font-bold">✕</button>
          </div>
        )}

        {/* PRINT HEADER FOR REPORTS */}
        <div className="hidden print:block p-6 text-center border-b-4 border-slate-900">
          <div className="flex justify-center items-center space-x-4">
            <img src={schoolLogo} alt="School Logo" className="w-16 h-16 rounded-full" />
            <div className="text-left">
              <h2 className="text-2xl font-black text-slate-900">{currentBranch.sansthaName}</h2>
              <h3 className="text-xl font-bold text-slate-700">{currentBranch.schoolName}</h3>
              <p className="text-xs text-slate-500">Official Database Register Report - All Branches</p>
            </div>
          </div>
        </div>

        {/* WORKSPACE LAYOUT (SIDEBAR + MAIN COMPONENT) */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-[75vh] print:flex-col">
          
          {/* SIDEBAR */}
          {currentUserRole !== "Parent" ? (
            <div className="w-full md:w-60 bg-slate-900 text-slate-300 p-3 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible space-x-1.5 md:space-x-0 md:space-y-1.5 border-r border-slate-800 scrollbar-thin print:hidden">
              
              <button 
                onClick={() => setActiveTab("dashboard")}
                className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${activeTab === "dashboard" ? "bg-orange-500 text-white font-black shadow-md" : "hover:bg-slate-800 text-slate-300"}`}
              >
                <Layers className="h-4 w-4" />
                <span>School Overview</span>
              </button>

              <button 
                onClick={() => setActiveTab("students")}
                className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${activeTab === "students" ? "bg-orange-500 text-white font-black shadow-md" : "hover:bg-slate-800 text-slate-300"}`}
              >
                <Users className="h-4 w-4" />
                <span>Students Register</span>
              </button>

              <button 
                onClick={() => setActiveTab("admissions")}
                className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${activeTab === "admissions" ? "bg-orange-500 text-white font-black shadow-md" : "hover:bg-slate-800 text-slate-300"}`}
              >
                <FileText className="h-4 w-4" />
                <span>Admissions Process</span>
              </button>

              {/* Promoting Pupils Tab (Requested) */}
              <button 
                onClick={() => setActiveTab("promote")}
                className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${activeTab === "promote" ? "bg-orange-500 text-white font-black shadow-md" : "hover:bg-slate-800 text-slate-300"}`}
              >
                <UserCheck className="h-4 w-4" />
                <span>Students Promote</span>
              </button>

              {/* New Ex-Students Tab (Requested) */}
              <button 
                onClick={() => setActiveTab("exStudents")}
                className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${activeTab === "exStudents" ? "bg-orange-500 text-white font-black shadow-md" : "hover:bg-slate-800 text-slate-300"}`}
              >
                <XCircle className="h-4 w-4" />
                <span>Schools Ex Students</span>
              </button>

              <button 
                onClick={() => setActiveTab("fees")}
                className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${activeTab === "fees" ? "bg-orange-500 text-white font-black shadow-md" : "hover:bg-slate-800 text-slate-300"}`}
              >
                <CreditCard className="h-4 w-4" />
                <span>Fees & Finance</span>
              </button>

              <button 
                onClick={() => setActiveTab("attendance")}
                className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${activeTab === "attendance" ? "bg-orange-500 text-white font-black shadow-md" : "hover:bg-slate-800 text-slate-300"}`}
              >
                <Calendar className="h-4 w-4" />
                <span>Class Attendance</span>
              </button>

              <button 
                onClick={() => setActiveTab("homework")}
                className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${activeTab === "homework" ? "bg-orange-500 text-white font-black shadow-md" : "hover:bg-slate-800 text-slate-300"}`}
              >
                <BookOpen className="h-4 w-4" />
                <span>Classroom Homework</span>
              </button>

              <button 
                onClick={() => setActiveTab("tracking")}
                className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${activeTab === "tracking" ? "bg-orange-500 text-white font-black shadow-md" : "hover:bg-slate-800 text-slate-300"}`}
              >
                <Truck className="h-4 w-4" />
                <span>Bus/Van GPS Hub</span>
              </button>

              <button 
                onClick={() => setActiveTab("results")}
                className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${activeTab === "results" ? "bg-orange-500 text-white font-black shadow-md" : "hover:bg-slate-800 text-slate-300"}`}
              >
                <TrendingUp className="h-4 w-4" />
                <span>Results & Progress</span>
              </button>

              {/* Reset Password Tab */}
              <button 
                onClick={() => setActiveTab("accounts-reset")}
                className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${activeTab === "accounts-reset" ? "bg-orange-500 text-white font-black shadow-md" : "hover:bg-slate-800 text-slate-300"}`}
              >
                <Lock className="h-4 w-4" />
                <span>User Accounts Reset</span>
              </button>

              <button 
                onClick={() => {
                  if (currentUserRole !== "Trustee") {
                    setSentMessageNotify("Access Restricted! Only Supreme Trustees can edit permission structures.");
                    setTimeout(() => setSentMessageNotify(null), 3000);
                    return;
                  }
                  setActiveTab("permissions");
                }}
                className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${activeTab === "permissions" ? "bg-orange-500 text-white font-black shadow-md" : "hover:bg-slate-800 text-slate-300"}`}
              >
                <Settings className="h-4 w-4" />
                <span>App Authority Sliders</span>
              </button>
            </div>
          ) : (
            /* PARENTS NAV BAR */
            <div className="w-full md:w-60 bg-slate-900 text-slate-300 p-3 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible space-x-1.5 md:space-x-0 md:space-y-1.5 border-r border-slate-800 print:hidden">
              <button 
                onClick={() => setActiveTab("parent-dashboard")}
                className="flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all bg-orange-500 text-white font-black shadow-md"
              >
                <Layers className="h-4 w-4" />
                <span>My Child Dashboard</span>
              </button>
            </div>
          )}

          {/* DYNAMIC SCREEN VIEWPORT AREA */}
          <div className="flex-1 p-3 sm:p-5 overflow-y-auto max-h-[75vh] print:max-h-none print:overflow-visible">
            
            {/* ----------------- TAB: MAIN OVERVIEW ----------------- */}
            {activeTab === "dashboard" && (
              <div className="space-y-5 animate-fade-in print:hidden">
                
                {/* TRUSTEE ONLY BRAND OVERWRITE */}
                {currentUserRole === "Trustee" ? (
                  <div className="bg-slate-50 p-4 rounded-2xl border-2 border-dashed border-orange-200 space-y-3">
                    <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest block">
                      👑 TRUSTEE EXCLUSIVE (Edit School Title & Brand Names)
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] text-slate-500 font-bold mb-1 uppercase">Sanstha Name</label>
                        <input 
                          type="text" 
                          className="w-full p-2 bg-white text-xs border rounded-lg font-bold" 
                          value={editingSansthaName}
                          onChange={(e) => setEditingSansthaName(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-slate-500 font-bold mb-1 uppercase">School/Branch Title</label>
                        <input 
                          type="text" 
                          className="w-full p-2 bg-white text-xs border rounded-lg font-bold" 
                          value={editingBranchName}
                          onChange={(e) => setEditingBranchName(e.target.value)}
                        />
                      </div>

                      <div className="flex items-end space-x-2">
                        <button 
                          onClick={handleUpdateBranchInfo}
                          className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-lg flex-1 font-bold"
                        >
                          Save Changes
                        </button>
                        <button 
                          onClick={handleAddNewBranch}
                          className="bg-slate-900 hover:bg-black text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center space-x-1"
                        >
                          <Plus className="h-4 w-4" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-500">
                    ℹ️ School Title and Branch configurations are locked. Only supreme Trustees can modify brand properties.
                  </div>
                )}

                {/* BRAND HERO CARD */}
                <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 p-5 rounded-2xl text-white relative overflow-hidden shadow-lg border-b-4 border-orange-500">
                  <span className="bg-orange-500 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider">
                    {currentBranch.sansthaName}
                  </span>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 gap-4">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black">{currentBranch.schoolName}</h2>
                      <p className="text-xs text-slate-300 mt-0.5">Primary Administration Desk | Location: {currentBranch.city} ({currentBranch.area})</p>
                    </div>
                    <img src={schoolLogo} alt="Logo" className="w-12 h-12 rounded-full border-2 border-orange-400 bg-white object-cover" />
                  </div>
                </div>

                {/* DYNAMIC GRADES MANAGEMENT VIEW */}
                <div className="bg-white p-4 rounded-xl border space-y-3 shadow-xs">
                  <div className="flex justify-between items-center border-b pb-2">
                    <h3 className="font-extrabold text-xs text-slate-950 uppercase tracking-wider">
                      🗂️ Grade Sector Configuration (Dynamic list)
                    </h3>
                    <span className="text-[10px] bg-slate-100 px-2 py-1 rounded font-bold">
                      Active Sectors: {grades.length}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500">These Grades dynamically populate your Admission, Student Details and Homework modules.</p>

                  <div className="flex flex-wrap gap-2">
                    {grades.map((gr, idx) => (
                      <span key={idx} className="bg-orange-50 text-orange-700 border border-orange-200 text-xs font-bold px-3 py-1 rounded-full">
                        {gr}
                      </span>
                    ))}
                  </div>

                  {["Trustee", "Coordinator"].includes(currentUserRole) && (
                    <form onSubmit={handleAddGrade} className="flex gap-2 max-w-sm pt-2">
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Nursery-B, Playgroup-A"
                        className="p-1.5 bg-slate-50 border rounded-lg text-xs flex-1"
                        value={newGradeName}
                        onChange={(e) => setNewGradeName(e.target.value)}
                      />
                      <button 
                        type="submit" 
                        className="bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg"
                      >
                        Add Grade +
                      </button>
                    </form>
                  )}
                </div>

                {/* STATS MATRIX */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                  <div className="bg-white p-4 rounded-xl border-l-4 border-orange-500 shadow-xs">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Admitted Students</span>
                    <h3 className="text-xl font-black text-slate-900 mt-1">{displayStudents.length} Students</h3>
                  </div>

                  <div className="bg-white p-4 rounded-xl border-l-4 border-slate-900 shadow-xs">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Fees Received</span>
                    <h3 className="text-xl font-black text-slate-900 mt-1">
                      ₹{displayStudents.reduce((acc, curr) => acc + curr.fees.paid, 0)}
                    </h3>
                  </div>

                  <div className="bg-white p-4 rounded-xl border-l-4 border-emerald-500 shadow-xs">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Current Branch Stops</span>
                    <h3 className="text-xl font-black text-emerald-700 mt-1">
                      {busStops.length} Registered
                    </h3>
                  </div>

                  <div className="bg-white p-4 rounded-xl border-l-4 border-red-500 shadow-xs">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Pending Fees Ledger</span>
                    <h3 className="text-xl font-black text-red-600 mt-1">
                      ₹{displayStudents.reduce((acc, curr) => acc + (curr.fees.total - curr.fees.paid - curr.fees.discount), 0)}
                    </h3>
                  </div>
                </div>

                {/* BIRTHDAY CORNER */}
                <div className="bg-orange-50/50 p-4 rounded-2xl border border-orange-200 space-y-3">
                  <div className="flex items-center space-x-2 text-orange-600">
                    <Gift className="h-4.5 w-4.5 animate-bounce" />
                    <h3 className="font-extrabold text-xs text-slate-900">Today's Birthday Corner</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl border shadow-2xs">
                      <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">🎉 Student Birthday Calendar</span>
                      <div className="space-y-2">
                        {displayStudents.filter(s => s.birthdayMonth === "05").map(stu => (
                          <div key={stu.id} className="flex justify-between items-center p-1.5 rounded bg-slate-50">
                            <div>
                              <h4 className="font-bold text-xs text-slate-900">{stu.name}</h4>
                              <p className="text-[10px] text-slate-500">Grade: {stu.class} | Birthdate: {stu.dob}</p>
                            </div>
                            <button 
                              onClick={() => setWishPersona({ name: stu.name, type: "Student" })}
                              className="bg-orange-500 text-white text-[10px] font-extrabold px-2.5 py-1 rounded"
                            >
                              Send Greeting Card 📲
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border shadow-2xs">
                      <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">👩‍🏫 Staff & Teacher Birthdays</span>
                      <div className="space-y-2">
                        {teachers.filter(t => t.birthdayMonth === "05").map(t => (
                          <div key={t.id} className="flex justify-between items-center p-1.5 rounded bg-slate-50">
                            <div>
                              <h4 className="font-bold text-xs text-slate-900">{t.name}</h4>
                              <p className="text-[10px] text-slate-500">Role: {t.role}</p>
                            </div>
                            <button 
                              onClick={() => setWishPersona({ name: t.name, type: "Teacher" })}
                              className="bg-slate-900 text-white text-[10px] font-extrabold px-2.5 py-1 rounded"
                            >
                              Send Message 🌸
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ACTIVE BRANCHES & FUTURE BRANCH VOTING SYSTEM */}
                <div className="bg-white p-5 rounded-xl border space-y-4">
                  <div className="border-b pb-2">
                    <h3 className="font-extrabold text-xs text-slate-950 uppercase tracking-wider">
                      🌍 Our Branches Network & Upcoming Sites
                    </h3>
                    <p className="text-[10px] text-slate-500">Showcasing current active preschool branches and checking parents' response to prospective future areas.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2.5">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Active Branches ({branches.length})</span>
                      {branches.map(b => (
                        <div key={b.id} className="p-3 rounded-lg bg-slate-50 border flex justify-between items-center text-xs">
                          <div>
                            <span className="font-bold text-slate-950 block">{b.schoolName}</span>
                            <span className="text-[10px] text-slate-500">{b.city} - {b.area}</span>
                          </div>
                          <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200 font-bold">Active</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2.5">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Proposed Future Branches (Voting)</span>
                      {futureBranches.map(fb => (
                        <div key={fb.id} className="p-3 rounded-lg bg-orange-50/40 border border-orange-100 flex justify-between items-center text-xs">
                          <div>
                            <span className="font-bold text-slate-950 block">{fb.city} ({fb.area})</span>
                            <span className="text-[10px] text-slate-500">Target Launch Year: {fb.proposedYear}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-black text-orange-600 bg-orange-100 px-2 py-1 rounded">
                              ❤️ {fb.likes} Votes
                            </span>
                            <button 
                              onClick={() => handleVoteFutureBranch(fb.id)}
                              className="bg-slate-900 hover:bg-black text-white text-[10px] font-bold px-2 py-1 rounded"
                            >
                              Vote / Like 👍
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* WISH PREVIEW MODAL */}
                {wishPersona && (
                  <div className="bg-slate-950 text-white p-5 rounded-2xl text-center border-2 border-orange-500 space-y-3 shadow-xl">
                    <p className="text-2xl">🍰🎈</p>
                    <h3 className="font-black text-sm">Greetings Sent to {wishPersona.name}!</h3>
                    <p className="text-xs text-slate-300">
                      We have simulated sending an official digital greetings card from {currentBranch.schoolName} to registered parent details.
                    </p>
                    <button onClick={() => setWishPersona(null)} className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      Close
                    </button>
                  </div>
                )}

                {/* EXPORT PANEL */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3">
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Data Report Center (Print & CSV Download)</h4>
                    <p className="text-[10px] text-slate-500 font-medium">Download complete preschool registers & ledger files safely.</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => exportDataCSV('students')}
                      className="bg-slate-800 hover:bg-slate-950 text-white text-[10px] font-bold px-3 py-2 rounded-lg flex items-center space-x-1"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download Students CSV</span>
                    </button>
                    <button 
                      onClick={triggerPrintPage}
                      className="bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-bold px-3 py-2 rounded-lg flex items-center space-x-1"
                    >
                      <Printer className="h-3.5 w-3.5" />
                      <span>Print Page Report</span>
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* ----------------- TAB: STUDENTS REGISTER (Confirmed list display only) ----------------- */}
            {activeTab === "students" && (
              <div className="space-y-5 animate-fade-in">
                
                {hasAccess("studentDetails") ? (
                  <>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Confirmed Admissions Directory</h2>
                        <p className="text-[10px] text-slate-500 font-medium">Verify registered pupils, assigned routes and dynamic backup options</p>
                      </div>

                      <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                        <input 
                          type="text" 
                          placeholder="Search admitted pupils..."
                          className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs focus:ring-1 focus:ring-orange-500 outline-none"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* DYNAMIC CATEGORY FILTER SHEETS (Grade Sectors) */}
                    <div className="bg-slate-50 p-2.5 rounded-xl border flex flex-wrap gap-1.5">
                      <button 
                        onClick={() => setSelectedGradeFilter("All")}
                        className={`text-[11px] font-bold px-3 py-1.5 rounded-lg transition ${selectedGradeFilter === "All" ? "bg-slate-900 text-white shadow" : "bg-white text-slate-600 hover:bg-slate-100"}`}
                      >
                        All Classes ({students.length})
                      </button>
                      {grades.map((gr, idx) => {
                        const count = students.filter(s => s.class === gr).length;
                        return (
                          <button 
                            key={idx}
                            onClick={() => setSelectedGradeFilter(gr)}
                            className={`text-[11px] font-bold px-3 py-1.5 rounded-lg transition ${selectedGradeFilter === gr ? "bg-orange-500 text-white shadow" : "bg-white text-slate-600 hover:bg-slate-100"}`}
                          >
                            {gr} ({count})
                          </button>
                        );
                      })}
                    </div>

                    {/* CONFIRMED STUDENTS DATABASE SHEET */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {displayStudents.map(st => (
                        <div key={st.id} className="bg-white p-4 rounded-xl border hover:border-orange-500 transition flex flex-col justify-between shadow-2xs relative">
                          
                          <div>
                            <div className="flex justify-between items-start">
                              <div className="flex items-center space-x-2.5">
                                <span className="w-9 h-9 rounded-full bg-slate-950 text-white flex items-center justify-center font-black text-xs">
                                  {st.name.substring(0, 2)}
                                </span>
                                <div>
                                  <h4 className="font-bold text-xs text-slate-950">{st.name}</h4>
                                  <span className="bg-orange-50 text-orange-600 text-[9px] font-extrabold px-1.5 py-0.5 rounded border border-orange-100 uppercase tracking-wide">
                                    Grade: {st.class}
                                  </span>
                                </div>
                              </div>
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                                {st.status}
                              </span>
                            </div>

                            <div className="mt-3 space-y-1.5 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg">
                              <p><strong className="text-slate-400 text-[10px] uppercase">Father's Name:</strong> {st.fatherName}</p>
                              <p><strong className="text-slate-400 text-[10px] uppercase">Mother's Name:</strong> {st.motherName}</p>
                              {st.guardianName !== "N/A" && (
                                <p><strong className="text-slate-400 text-[10px] uppercase">Guardian:</strong> {st.guardianName} ({st.guardianPhone})</p>
                              )}
                              <p><strong className="text-slate-400 text-[10px] uppercase">Contact:</strong> 📞 {st.parentPhone}</p>
                              <p><strong className="text-slate-400 text-[10px] uppercase">Address:</strong> 📍 {st.address}</p>
                              
                              {/* Transport Allocations Details */}
                              <div className="mt-2 pt-2 border-t border-slate-200 text-[11px]">
                                <p className="font-extrabold text-[10px] text-slate-500 uppercase flex items-center gap-1">
                                  <Truck className="h-3 w-3 text-orange-500" />
                                  <span>Transport Allocations:</span>
                                </p>
                                {st.transport.usesBus ? (
                                  <div className="mt-1 bg-orange-50/50 p-1.5 rounded border border-orange-100">
                                    <p>🚌 Allocated Vehicle: <span className="font-bold">{st.transport.busNo}</span></p>
                                    <p>📍 Stop Allocated: <span className="font-bold">{st.transport.stop}</span></p>
                                  </div>
                                ) : (
                                  <span className="text-[10px] text-slate-400 italic">Self Transport / Parents Pick-up</span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* REVERT / CANCEL ADMISSION ACTION */}
                          <div className="mt-3 pt-3 border-t flex justify-end">
                            <button 
                              onClick={() => {
                                setStudentToRevert(st);
                                setShowCustomRevertModal(true);
                              }}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 text-[10px] font-bold px-3 py-1.5 rounded border border-red-200 transition"
                            >
                              Cancel / Revert Admission ✕
                            </button>
                          </div>

                        </div>
                      ))}

                      {displayStudents.length === 0 && (
                        <p className="text-xs text-slate-400 italic p-6 text-center col-span-2">
                          No confirmed student registers match selected parameters.
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="bg-red-50 p-6 rounded-xl text-center text-xs text-red-900 font-bold">
                    Access Denied. You do not have permissions to view student registry.
                  </div>
                )}

              </div>
            )}

            {/* ----------------- TAB: ADMISSIONS PROCESS ----------------- */}
            {activeTab === "admissions" && (
              <div className="space-y-5 animate-fade-in">
                
                {hasAccess("admissions") ? (
                  <>
                    <div className="bg-slate-900 text-white p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div>
                        <h2 className="text-sm font-extrabold uppercase">Admission & Pipeline Registration</h2>
                        <p className="text-[10px] text-slate-300 font-medium">Add new students and track leads through the verification process</p>
                      </div>
                    </div>

                    {/* TOP SECTION: +NEW STUDENTS ADMISSION FORM (Moved from Register) */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
                      <div className="flex items-center space-x-2 border-b pb-2 text-slate-900">
                        <Plus className="h-4.5 w-4.5 text-orange-500" />
                        <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-950">
                          + New Student Admission Form
                        </h3>
                      </div>

                      <form onSubmit={handleAddStudent} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">Student Full Name *</label>
                          <input 
                            type="text" 
                            required
                            placeholder="e.g. Parth Sanjay Patil"
                            className="w-full p-2 bg-slate-50 border rounded-lg text-xs font-semibold outline-none focus:ring-1 focus:ring-orange-500"
                            value={newStudent.name}
                            onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">Grade Level *</label>
                          <select 
                            className="w-full p-2 bg-slate-50 border rounded-lg text-xs font-bold outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer"
                            value={newStudent.class}
                            onChange={(e) => setNewStudent({...newStudent, class: e.target.value})}
                          >
                            {grades.map((gr, idx) => (
                              <option key={idx} value={gr}>{gr}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">Date of Birth</label>
                          <input 
                            type="date" 
                            className="w-full p-2 bg-slate-50 border rounded-lg text-xs"
                            value={newStudent.dob}
                            onChange={(e) => setNewStudent({...newStudent, dob: e.target.value})}
                          />
                        </div>

                        {/* COMPULSORY 12-DIGIT AADHAR CARD FIELD FOR SECURITY SCHEMAS */}
                        <div>
                          <label className="block text-[10px] font-bold text-orange-600 mb-1 uppercase">Parent Aadhar Card Number *</label>
                          <input 
                            type="text" 
                            required
                            maxLength={12}
                            placeholder="12-digit numeric Aadhar"
                            className="w-full p-2 bg-orange-50 border border-orange-300 rounded-lg text-xs font-bold focus:ring-1 focus:ring-orange-500"
                            value={newStudent.parentAadhar}
                            onChange={(e) => setNewStudent({...newStudent, parentAadhar: e.target.value.replace(/\D/g, '')})}
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">Father's Full Name *</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Father's Name (Mandatory)"
                            className="w-full p-2 bg-slate-50 border rounded-lg text-xs"
                            value={newStudent.fatherName}
                            onChange={(e) => setNewStudent({...newStudent, fatherName: e.target.value})}
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">Mother's Full Name *</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Mother's Name (Mandatory)"
                            className="w-full p-2 bg-slate-50 border rounded-lg text-xs"
                            value={newStudent.motherName}
                            onChange={(e) => setNewStudent({...newStudent, motherName: e.target.value})}
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">Primary Contact Phone *</label>
                          <input 
                            type="tel" 
                            required
                            placeholder="10-digit primary contact"
                            className="w-full p-2 bg-slate-50 border rounded-lg text-xs"
                            value={newStudent.parentPhone}
                            onChange={(e) => setNewStudent({...newStudent, parentPhone: e.target.value})}
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">Local Guardian Name (Optional)</label>
                          <input 
                            type="text" 
                            placeholder="Guardian Name (If any)"
                            className="w-full p-2 bg-slate-50 border rounded-lg text-xs"
                            value={newStudent.guardianName}
                            onChange={(e) => setNewStudent({...newStudent, guardianName: e.target.value})}
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">Guardian Contact Number</label>
                          <input 
                            type="tel" 
                            placeholder="Guardian Phone (If any)"
                            className="w-full p-2 bg-slate-50 border rounded-lg text-xs"
                            value={newStudent.guardianPhone}
                            onChange={(e) => setNewStudent({...newStudent, guardianPhone: e.target.value})}
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">Residential Address</label>
                          <input 
                            type="text" 
                            placeholder="Sector, Landmark, Area Address"
                            className="w-full p-2 bg-slate-50 border rounded-lg text-xs"
                            value={newStudent.address}
                            onChange={(e) => setNewStudent({...newStudent, address: e.target.value})}
                          />
                        </div>

                        {/* Transport Assignment options */}
                        <div className="md:col-span-3 bg-slate-50 p-3 rounded-lg border flex flex-col md:flex-row gap-3 items-center">
                          <div className="flex items-center space-x-2">
                            <input 
                              type="checkbox" 
                              id="usesBusRegister" 
                              checked={newStudent.usesBus}
                              onChange={(e) => setNewStudent({...newStudent, usesBus: e.target.checked})}
                              className="h-4 w-4 cursor-pointer text-orange-500"
                            />
                            <label htmlFor="usesBusRegister" className="text-xs font-bold text-slate-900 cursor-pointer">
                              Allocate School Bus / Van Transport facility?
                            </label>
                          </div>

                          {newStudent.usesBus && (
                            <div className="flex-1 grid grid-cols-2 gap-2 w-full animate-fade-in">
                              <div>
                                <select 
                                  className="w-full p-1.5 bg-white border text-xs rounded font-semibold"
                                  value={newStudent.busNo}
                                  onChange={(e) => setNewStudent({...newStudent, busNo: e.target.value})}
                                >
                                  <option value="BUS-01">BUS-01 (Route 1)</option>
                                  <option value="VAN-02">VAN-02 (Route 2)</option>
                                </select>
                              </div>
                              <div>
                                <select 
                                  className="w-full p-1.5 bg-white border text-xs rounded font-semibold"
                                  value={newStudent.assignedStop}
                                  onChange={(e) => setNewStudent({...newStudent, assignedStop: e.target.value})}
                                >
                                  {busStops.map((st, idx) => (
                                    <option key={idx} value={st.name}>{st.name}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="md:col-span-3 flex justify-end">
                          <button 
                            type="submit" 
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow"
                          >
                            Confirm Admission & Register Student
                          </button>
                        </div>
                      </form>
                    </div>

                    {/* BOTTOM SECTION: ADMISSION INQUIRY & VERIFICATION HUB (Two Pipeline stages) */}
                    <div className="bg-slate-50 p-5 rounded-2xl border space-y-4">
                      <div className="border-b pb-2">
                        <h4 className="font-extrabold text-xs text-slate-950 uppercase tracking-wider">
                          📋 Verification Pipeline stages
                        </h4>
                        <p className="text-[10px] text-slate-500">
                          Move inquiries into the document verification checklist before approving active admission status.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        
                        {/* 1. LEADS / INQUIRIES */}
                        <div className="bg-white p-4 rounded-xl border space-y-3">
                          <div className="flex justify-between items-center border-b pb-1.5">
                            <span className="text-xs font-extrabold text-slate-900 uppercase">1. Leads & Inquiries</span>
                            <span className="bg-orange-100 text-orange-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                              {inquiries.filter(i => i.stage === "Leads/Inquiries").length}
                            </span>
                          </div>

                          <div className="space-y-3">
                            {inquiries.filter(i => i.stage === "Leads/Inquiries").map(inq => (
                              <div key={inq.id} className="bg-slate-50 p-3 rounded-xl border space-y-2 text-xs">
                                <div>
                                  <span className="font-extrabold text-slate-950 block">{inq.name}</span>
                                  <span className="text-[10px] text-slate-400">Class: {inq.class} | Date: {inq.date}</span>
                                </div>
                                
                                <div className="bg-white p-2 rounded text-[11px] text-slate-600 space-y-0.5">
                                  <p><strong>Father:</strong> {inq.fatherName}</p>
                                  <p><strong>Mother:</strong> {inq.motherName}</p>
                                  <p><strong>Phone:</strong> 📞 {inq.parentPhone}</p>
                                </div>

                                <div className="flex gap-1 pt-1">
                                  <button 
                                    onClick={() => changeInquiryStage(inq.id, "Parents Interaction & Docs Verify")}
                                    className="bg-slate-900 text-white text-[10px] px-2 py-1.5 rounded font-bold flex-1"
                                  >
                                    Move to Verify ➔
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteInquiry(inq.id)}
                                    className="text-red-500 hover:bg-red-50 p-1 rounded"
                                    title="Delete Lead"
                                  >
                                    <Trash className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 2. PARENTS INTERACTION & DOCS VERIFY */}
                        <div className="bg-white p-4 rounded-xl border space-y-3">
                          <div className="flex justify-between items-center border-b pb-1.5">
                            <span className="text-xs font-extrabold text-slate-900 uppercase">2. Document Check & Verify</span>
                            <span className="bg-blue-100 text-blue-900 text-[10px] font-black px-2 py-0.5 rounded-full">
                              {inquiries.filter(i => i.stage === "Parents Interaction & Docs Verify").length}
                            </span>
                          </div>

                          <div className="space-y-3">
                            {inquiries.filter(i => i.stage === "Parents Interaction & Docs Verify").map(inq => (
                              <div key={inq.id} className="bg-slate-50 p-3 rounded-xl border space-y-3 text-xs">
                                <div>
                                  <span className="font-extrabold text-slate-950 block">{inq.name}</span>
                                  <span className="text-[10px] text-slate-500 font-semibold uppercase">Documents Check list:</span>
                                </div>

                                <div className="space-y-1.5 bg-white p-2 rounded text-[11px]">
                                  {[
                                    { key: "birthCertificate", label: "Birth Certificate" },
                                    { key: "addressProof", label: "Address Proof" },
                                    { key: "parentAadhar", label: "Parents Aadhar Card" },
                                    { key: "formFilled", label: "Admission Form Filled" },
                                    { key: "undertakingSigned", label: "Undertaking Form" },
                                    { key: "photoSubmitted", label: "Colour Passport Size Photo" },
                                    { key: "healthForm", label: "Health Information Form" }
                                  ].map(doc => (
                                    <div key={doc.key} className="flex items-center justify-between">
                                      <span className="font-semibold text-slate-700">{doc.label}</span>
                                      <input 
                                        type="checkbox" 
                                        checked={inq.docs[doc.key] || false} 
                                        onChange={() => toggleDocCheck(inq.id, doc.key)}
                                        className="h-3.5 w-3.5 cursor-pointer text-orange-500" 
                                      />
                                    </div>
                                  ))}
                                </div>

                                <div className="flex flex-col gap-1.5">
                                  {Object.values(inq.docs).every(v => v === true) ? (
                                    <button 
                                      onClick={() => handleApproveInquiry(inq)}
                                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] py-1.5 rounded font-black uppercase tracking-wider shadow"
                                    >
                                      Approve Admission ✅
                                    </button>
                                  ) : (
                                    <span className="text-[9px] bg-amber-50 text-amber-800 p-1.5 rounded font-bold text-center">
                                      ⏳ Missing pending check list papers to approve.
                                    </span>
                                  )}
                                  
                                  <div className="flex gap-1">
                                    <button 
                                      onClick={() => handleDeclineInquiry(inq.id)}
                                      className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-[10px] px-2 py-1 rounded font-bold flex-1"
                                    >
                                      Decline Lead
                                    </button>
                                    <button 
                                      onClick={() => changeInquiryStage(inq.id, "Leads/Inquiries")}
                                      className="bg-slate-800 text-white text-[10px] px-2 py-1 rounded font-bold"
                                    >
                                      ⮌ Back
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>

                  </>
                ) : (
                  <div className="bg-red-50 p-6 rounded-xl text-center text-xs text-red-900 font-bold">
                    Access Denied. Admissions configurations restricted by supreme Trustee permissions.
                  </div>
                )}

              </div>
            )}

            {/* ----------------- TAB: PROMOTIONS AND GRADE UPGRADES ----------------- */}
            {activeTab === "promote" && (
              <div className="space-y-5 animate-fade-in">
                
                <div className="bg-white p-5 rounded-2xl border space-y-4">
                  <div className="border-b pb-2">
                    <h3 className="font-extrabold text-xs text-slate-950 uppercase tracking-wider flex items-center space-x-1">
                      <UserCheck className="h-5 w-5 text-orange-500" />
                      <span>Students Promotion Center</span>
                    </h3>
                    <p className="text-[10px] text-slate-500">Promote multiple students from their current class to the next academic level class at one time.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Current Class / Grade Level:</label>
                      <select 
                        value={promoteFromClass} 
                        onChange={(e) => {
                          setPromoteFromClass(e.target.value);
                          setSelectedStudentsForPromotion({});
                        }}
                        className="w-full p-2 bg-white border text-xs rounded-lg font-bold"
                      >
                        {grades.map((gr, idx) => (
                          <option key={idx} value={gr}>{gr}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Destination Target Class:</label>
                      <select 
                        value={promoteToClass} 
                        onChange={(e) => setPromoteToClass(e.target.value)}
                        className="w-full p-2 bg-white border text-xs rounded-lg font-bold"
                      >
                        {grades.map((gr, idx) => (
                          <option key={idx} value={gr}>{gr}</option>
                        ))}
                        {/* New Option to move student to alumni history database */}
                        <option value="Leave School" className="text-red-600 font-bold">Leave School (Transfer to Ex-Students Register) ✕</option>
                      </select>
                    </div>
                  </div>

                  {/* Pupil Selection Table */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">
                      Select Pupils from {promoteFromClass} to Promote:
                    </span>

                    <div className="border rounded-xl bg-white overflow-hidden">
                      <table className="w-full text-left text-xs text-slate-600">
                        <thead className="bg-slate-50 font-bold text-[10px] text-slate-500 uppercase border-b">
                          <tr>
                            <th className="p-3 w-12 text-center">Select</th>
                            <th className="p-3">Student Name</th>
                            <th className="p-3">Current Class</th>
                            <th className="p-3">Primary Contact</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {students.filter(st => st.class === promoteFromClass).map(st => (
                            <tr key={st.id} className="hover:bg-slate-50/50">
                              <td className="p-3 text-center">
                                <input 
                                  type="checkbox" 
                                  checked={selectedStudentsForPromotion[st.id] || false}
                                  onChange={() => handleToggleStudentSelectionForPromotion(st.id)}
                                  className="h-4 w-4 cursor-pointer text-orange-500"
                                />
                              </td>
                              <td className="p-3 font-bold text-slate-900">{st.name}</td>
                              <td className="p-3 text-slate-500">{st.class}</td>
                              <td className="p-3 text-slate-500">📞 {st.parentPhone}</td>
                            </tr>
                          ))}

                          {students.filter(st => st.class === promoteFromClass).length === 0 && (
                            <tr>
                              <td colSpan={4} className="p-6 text-center text-xs text-slate-400 italic">
                                No students registered in "{promoteFromClass}" class to display for promotion.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button 
                      onClick={handlePromoteStudentsNow}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow flex items-center space-x-1"
                    >
                      <span>Promote Selected Students</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* ----------------- TAB: SCHOOLS EX STUDENTS REGISTER ----------------- */}
            {activeTab === "exStudents" && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-white p-5 rounded-xl border space-y-4">
                  <div className="border-b pb-2">
                    <h3 className="font-extrabold text-xs text-slate-950 uppercase tracking-wider flex items-center space-x-1.5 text-red-600">
                      <XCircle className="h-5 w-5" />
                      <span>Schools Ex Students (Alumni & TC Issued History)</span>
                    </h3>
                    <p className="text-[10px] text-slate-500">
                      Historical directory tracking past student profiles, details and registration logs. Records can be permanently deleted here if needed.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {exStudents.map(ex => (
                      <div key={ex.id} className="p-4 rounded-xl bg-red-50/40 border border-red-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs">
                        <div>
                          <span className="font-extrabold text-slate-950 text-sm block">{ex.name}</span>
                          <p className="text-[10px] text-slate-500 mt-0.5 font-bold uppercase">
                            Former Class: {ex.class} | Father: {ex.fatherName} | Contact: {ex.parentPhone}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-1">📍 Address: {ex.address}</p>
                        </div>

                        <button 
                          onClick={() => {
                            setExStudents(exStudents.filter(e => e.id !== ex.id));
                            setSentMessageNotify("Ex-student record deleted permanently!");
                            setTimeout(() => setSentMessageNotify(null), 3000);
                          }}
                          className="bg-white hover:bg-red-50 text-red-600 border border-red-200 text-[10px] px-3 py-1.5 rounded-lg font-bold flex items-center space-x-1"
                        >
                          <Trash className="h-3.5 w-3.5" />
                          <span>Delete Permanent</span>
                        </button>
                      </div>
                    ))}

                    {exStudents.length === 0 && (
                      <p className="text-xs text-slate-400 italic p-6 text-center">No Ex-students currently logged in alumni archives.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ----------------- TAB: FEES & FINANCE ----------------- */}
            {activeTab === "fees" && (
              <div className="space-y-5 animate-fade-in">
                
                {hasAccess("finance") ? (
                  <>
                    <div className="bg-white p-4 rounded-xl border">
                      <h3 className="font-extrabold text-xs text-slate-950 uppercase mb-3">Termwise Fees Accounting & Ledger</h3>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-slate-600 font-bold">
                          <thead>
                            <tr className="bg-slate-50 border-b text-[10px] text-slate-500 font-bold uppercase">
                              <th className="p-3">Student Name</th>
                              <th className="p-3">Total Fee</th>
                              <th className="p-3">Discount Granted</th>
                              <th className="p-3">Paid Amount</th>
                              <th className="p-3">Remaining Balance</th>
                              <th className="p-3">Term Status</th>
                              <th className="p-3">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {displayStudents.map(st => {
                              const remaining = st.fees.total - st.fees.paid - st.fees.discount;
                              return (
                                <tr key={st.id} className="hover:bg-slate-50/50">
                                  <td className="p-3">
                                    <span className="font-bold text-slate-950 block">{st.name}</span>
                                    <span className="text-[10px] text-slate-400">{st.class}</span>
                                  </td>
                                  <td className="p-3">₹{st.fees.total}</td>
                                  <td className="p-3">
                                    <span className="font-bold text-orange-600 block">₹{st.fees.discount}</span>
                                    <span className="text-[9px] text-slate-500">{st.fees.discountName}</span>
                                  </td>
                                  <td className="p-3 font-bold text-emerald-600">₹{st.fees.paid}</td>
                                  <td className="p-3 font-black text-red-600">₹{remaining}</td>
                                  <td className="p-3">
                                    <span className="bg-slate-100 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded">
                                      {st.fees.term}
                                    </span>
                                  </td>
                                  <td className="p-3">
                                    {remaining > 0 && (
                                      <button 
                                        onClick={() => {
                                          setSentMessageNotify(`SMS Reminder simulated and sent to father's registered number (+91 ${st.parentPhone})`);
                                          setTimeout(() => setSentMessageNotify(null), 4000);
                                        }}
                                        className="bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-xs"
                                      >
                                        Send Fee SMS
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="bg-red-50 p-6 rounded-xl text-center text-xs text-red-900 font-bold">
                    Access Denied. Contact Trusties to get access to fee accounts ledger modules.
                  </div>
                )}

              </div>
            )}

            {/* ----------------- TAB: ATTENDANCE ----------------- */}
            {activeTab === "attendance" && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-white p-4 rounded-xl border">
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-3 mb-3 gap-3">
                    <div>
                      <h3 className="font-extrabold text-xs text-slate-950 uppercase">Daily Classroom Attendance</h3>
                      <p className="text-[10px] text-slate-500 font-medium">Filter by grade level to take or review classroom registry</p>
                    </div>

                    <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-lg border">
                      <span className="text-[10px] font-bold text-slate-700">Classroom/Grade:</span>
                      <select 
                        value={attendanceClassFilter}
                        onChange={(e) => setAttendanceClassFilter(e.target.value)}
                        className="bg-white text-xs font-bold p-1 rounded border outline-none cursor-pointer"
                      >
                        {grades.map((gr, idx) => (
                          <option key={idx} value={gr}>{gr}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {displayStudents.filter(st => st.class === attendanceClassFilter).length > 0 ? (
                      displayStudents.filter(st => st.class === attendanceClassFilter).map(st => (
                        <div key={st.id} className="flex justify-between items-center p-2 rounded bg-slate-50 text-xs">
                          <div>
                            <p className="font-bold text-slate-900">{st.name}</p>
                            <p className="text-[10px] text-slate-400 font-semibold">Total present: {st.attendance.present} / {st.attendance.total} days</p>
                          </div>
                          <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-[10px] font-bold">Present ✅</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 italic text-center p-6">No students admitted in "{attendanceClassFilter}" grade yet.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ----------------- TAB: BUS/VAN TRACKING ----------------- */}
            {activeTab === "tracking" && (
              <div className="space-y-5 animate-fade-in">
                
                {hasAccess("transport") ? (
                  <>
                    <div className="bg-white p-5 rounded-xl border space-y-4">
                      
                      {/* Access Authorization Key */}
                      <div className="bg-orange-50 p-4 rounded-xl border border-orange-200 flex flex-col sm:flex-row justify-between items-center gap-3">
                        <div>
                          <h4 className="font-extrabold text-xs text-slate-900 uppercase">
                            ⚙️ Parents Live Tracking Authority Panel
                          </h4>
                          <p className="text-[10px] text-slate-500 font-medium">
                            Coordinators and Headmasters configure GPS Live Streaming access for parents here.
                          </p>
                        </div>
                        
                        {["Coordinator", "Trustee"].includes(currentUserRole) ? (
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-slate-700">Access Status:</span>
                            <button 
                              onClick={() => {
                                setLiveTrackingAccessAllowed(!liveTrackingAccessAllowed);
                                setSentMessageNotify(`Parents tracking access updated to: ${!liveTrackingAccessAllowed ? 'ALLOWED' : 'LOCKED'}`);
                                        setTimeout(() => setSentMessageNotify(null), 3000);
                              }}
                              className={`text-xs font-black px-4 py-1.5 rounded-lg text-white transition ${liveTrackingAccessAllowed ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'}`}
                            >
                              {liveTrackingAccessAllowed ? 'ALLOWED (Accessible to Parents)' : 'LOCKED (Restricted)'}
                            </button>
                          </div>
                        ) : (
                          <div className="bg-white px-3 py-1 rounded text-[10px] font-bold text-red-600 border">
                            Locked. Only Coordinators and HM can configure live tracking authority keys.
                          </div>
                        )}
                      </div>

                      {/* BUS / VAN STOPS CONFIGS */}
                      <div className="space-y-3 pt-2">
                        <div className="flex justify-between items-center">
                          <h4 className="font-extrabold text-xs text-slate-950 uppercase tracking-wider">
                            📍 Bus/Van Stops Registry
                          </h4>
                        </div>
                        
                        {["Coordinator", "Trustee"].includes(currentUserRole) && (
                          <form onSubmit={handleAddBusStop} className="grid grid-cols-1 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-lg border">
                            <input 
                              type="text" 
                              required
                              placeholder="Stop Location Name"
                              className="p-1.5 bg-white border text-xs rounded outline-none"
                              value={newStopName}
                              onChange={(e) => setNewStopName(e.target.value)}
                            />
                            <input 
                              type="text" 
                              required
                              placeholder="Pickup Time (e.g. 08:45 AM)"
                              className="p-1.5 bg-white border text-xs rounded outline-none"
                              value={newStopTime}
                              onChange={(e) => setNewStopTime(e.target.value)}
                            />
                            <select 
                              className="p-1.5 bg-white border text-xs rounded cursor-pointer outline-none"
                              value={newStopVehicle}
                              onChange={(e) => setNewStopVehicle(e.target.value)}
                            >
                              <option value="Bus-01">Bus-01 (Route 1)</option>
                              <option value="Van-02">Van-02 (Route 2)</option>
                            </select>
                            <button type="submit" className="bg-slate-900 hover:bg-black text-white text-xs font-bold py-1.5 rounded-lg">
                              Add Stop Point
                            </button>
                          </form>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {busStops.map(st => (
                            <div key={st.id} className="bg-white p-3 rounded-lg border flex justify-between items-center text-xs">
                              <div>
                                <span className="font-extrabold text-slate-950 block">{st.name}</span>
                                <span className="text-[10px] text-slate-400">Vehicle: {st.type} | Pickup: {st.time}</span>
                              </div>
                              {["Coordinator", "Trustee"].includes(currentUserRole) && (
                                <button 
                                  onClick={() => handleRemoveBusStop(st.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <Trash className="h-4 w-4" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* MAP STREAM BOX */}
                      <div className="bg-slate-950 text-white p-5 rounded-xl border border-orange-500">
                        <span className="bg-emerald-500 text-black text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider animate-pulse">
                          ● GPS Stream Online (Simulated)
                        </span>
                        <div className="mt-3 text-xs space-y-1">
                          <p className="font-bold">Active vehicles are pinging location logs successfully to cloud server.</p>
                          <p className="text-slate-400">Authorized parents will see active tracking button in their child's portal.</p>
                        </div>
                      </div>

                    </div>
                  </>
                ) : (
                  <div className="bg-red-50 p-6 rounded-xl text-center text-xs text-red-900 font-bold">
                    Access restricted. Coordinators/Teachers credentials required to view transport configurations.
                  </div>
                )}

              </div>
            )}

            {/* ----------------- TAB: HOMEWORK DIARY ----------------- */}
            {activeTab === "homework" && (
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl border space-y-3">
                  <h3 className="font-extrabold text-xs text-slate-950 uppercase">Today's Homework Diary Desk</h3>
                  
                  <form onSubmit={handleAddHomework} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 font-bold mb-1">Select Grade</label>
                      <select 
                        className="w-full p-2 bg-slate-50 border rounded text-xs outline-none"
                        value={newHomework.class}
                        onChange={(e) => setNewHomework({...newHomework, class: e.target.value})}
                      >
                        {grades.map((gr, idx) => (
                          <option key={idx} value={gr}>{gr}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-400 font-bold mb-1">Select Subject</label>
                      <select 
                        className="w-full p-2 bg-slate-50 border rounded text-xs outline-none"
                        value={newHomework.subject}
                        onChange={(e) => setNewHomework({...newHomework, subject: e.target.value})}
                      >
                        {subjects.map((subj, idx) => (
                          <option key={idx} value={subj}>{subj}</option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-3">
                      <textarea 
                        rows={2}
                        required
                        placeholder="Type active task guidelines for students..."
                        className="w-full p-2 bg-slate-50 border rounded text-xs outline-none"
                        value={newHomework.topic}
                        onChange={(e) => setNewHomework({...newHomework, topic: e.target.value})}
                      />
                    </div>

                    <div className="sm:col-span-3 flex justify-end">
                      <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-lg">
                        Publish to Diary
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* ----------------- TAB: RESULTS, PROGRESS & SUBJECTS ----------------- */}
            {activeTab === "results" && (
              <div className="space-y-6">
                
                {/* DYNAMIC SUBJECT CATEGORIES */}
                <div className="bg-white p-5 rounded-2xl border space-y-4">
                  <div className="border-b pb-2 flex justify-between items-center">
                    <div>
                      <h3 className="font-extrabold text-xs text-slate-950 uppercase tracking-wider flex items-center space-x-1.5">
                        <BookOpen className="h-4.5 w-4.5 text-orange-500" />
                        <span>Dynamic Subject & Quality Categories</span>
                      </h3>
                      <p className="text-[10px] text-slate-400 font-medium">Add dynamic subjects (e.g. Marathi, Arts, EVS, Sports) to assess pupils comprehensively</p>
                    </div>
                    <span className="text-[10px] bg-orange-100 text-orange-800 font-bold px-2 py-1 rounded">
                      Total Active: {subjects.length}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {subjects.map((subj, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1">
                        <span>{subj}</span>
                        <button 
                          onClick={() => handleRemoveSubject(subj)}
                          className="text-red-500 hover:text-red-700 ml-1 font-extrabold"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>

                  {["Trustee", "Coordinator", "Class Teacher"].includes(currentUserRole) && (
                    <form onSubmit={handleAddSubject} className="flex gap-2 max-w-md pt-2">
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Marathi, EVS, Sports"
                        className="p-1.5 bg-slate-50 border rounded-lg text-xs flex-1 font-semibold outline-none"
                        value={newSubjectName}
                        onChange={(e) => setNewSubjectName(e.target.value)}
                      />
                      <button 
                        type="submit" 
                        className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-1.5 rounded-lg"
                      >
                        Add Category +
                      </button>
                    </form>
                  )}
                </div>

                <div className="bg-slate-900 text-white p-4 rounded-xl flex flex-wrap gap-4 justify-between items-center text-xs">
                  <div className="flex items-center space-x-3">
                    <span className="font-bold">Result Release Settings:</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${resultsReleased ? 'bg-emerald-500 text-black' : 'bg-red-500 text-white'}`}>
                      {resultsReleased ? "Released" : "Hold / Hidden"}
                    </span>
                  </div>

                  {hasAccess("releaseMarks") && (
                    <button 
                      onClick={() => {
                        setResultsReleased(!resultsReleased);
                        setSentMessageNotify(`Report Card Release status updated to: ${!resultsReleased ? 'RELEASED' : 'HOLD'}`);
                        setTimeout(() => setSentMessageNotify(null), 3000);
                      }}
                      className="bg-orange-500 hover:bg-orange-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg"
                    >
                      {resultsReleased ? "Recall/Hold Marks" : "Release Marks to Parents 📤"}
                    </button>
                  )}
                </div>

                {/* ENTER/EDIT GRADES WORKSPACE */}
                {hasAccess("enterEditGrades") ? (
                  <div className="bg-white p-5 rounded-2xl border space-y-4">
                    <div className="border-b pb-2">
                      <h3 className="font-extrabold text-xs text-slate-950 uppercase tracking-wider flex items-center space-x-1.5">
                        <Edit className="h-4.5 w-4.5 text-blue-500" />
                        <span>Enter / Edit Grades Workspace</span>
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {displayStudents.map(st => (
                        <div key={st.id} className="p-3.5 rounded-xl bg-slate-50 border space-y-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="font-bold text-xs text-slate-900 block">{st.name}</span>
                              <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-black uppercase">{st.class}</span>
                            </div>
                            
                            {editStudentGradesId === st.id ? (
                              <div className="flex space-x-1">
                                <button 
                                  onClick={() => handleSaveGrades(st.id)}
                                  className="bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded"
                                >
                                  Save
                                </button>
                                <button 
                                  onClick={() => setEditStudentGradesId(null)}
                                  className="bg-slate-400 text-white text-[10px] font-bold px-2 py-1 rounded"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button 
                                onClick={() => {
                                  setEditStudentGradesId(st.id);
                                  setEditGradesData(st.results || {});
                                }}
                                className="bg-slate-900 text-white text-[10px] font-bold px-3 py-1 rounded flex items-center space-x-1"
                              >
                                <Edit className="h-3 w-3" />
                                <span>Edit Student Grades</span>
                              </button>
                            )}
                          </div>

                          {editStudentGradesId === st.id ? (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
                              {subjects.map((subj, idx) => (
                                <div key={idx} className="bg-white p-2 rounded border">
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">{subj}</label>
                                  <input 
                                    type="text" 
                                    className="w-full border p-1 rounded text-xs font-bold outline-none"
                                    placeholder="Grade"
                                    value={editGradesData[subj] || ""}
                                    onChange={(e) => setEditGradesData({ ...editGradesData, [subj]: e.target.value })}
                                  />
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex flex-wrap gap-2 text-[11px]">
                              {subjects.map((subj, idx) => (
                                <span key={idx} className="bg-white px-2.5 py-1 rounded border font-semibold">
                                  <strong>{subj}:</strong> {st.results[subj] || "N/A"}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 p-4 rounded-xl text-center text-xs text-slate-400 font-medium">
                    🔒 "Enter / Edit Grades" module restricted by Trustee authority sliders.
                  </div>
                )}

                {/* VIEW RESULTS SHEET */}
                {hasAccess("viewResults") ? (
                  <div className="bg-white p-5 rounded-2xl border space-y-4">
                    <div className="border-b pb-2">
                      <h3 className="font-extrabold text-xs text-slate-950 uppercase tracking-wider flex items-center space-x-1.5">
                        <Award className="h-4.5 w-4.5 text-emerald-500" />
                        <span>View Official Results Sheets</span>
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {displayStudents.map(st => (
                        <div key={st.id} className="p-4 rounded-xl bg-slate-50 border space-y-2">
                          <h4 className="font-bold text-xs text-slate-900 border-b pb-1 flex justify-between">
                            <span>{st.name}</span>
                            <span className="text-[10px] text-slate-500 font-bold uppercase">{st.class}</span>
                          </h4>
                          
                          <div className="grid grid-cols-2 gap-2 text-[11px]">
                            {subjects.map((subj, idx) => (
                              <div key={idx} className="bg-white p-2 rounded border flex justify-between items-center">
                                <span className="text-slate-500 font-bold uppercase text-[9px]">{subj}</span>
                                <span className="font-black text-slate-900 text-xs">{st.results[subj] || "N/A"}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 p-4 rounded-xl text-center text-xs text-slate-400 font-medium">
                    🔒 "View Results" module restricted by Trustee authority sliders.
                  </div>
                )}

              </div>
            )}

            {/* ----------------- TAB: SYSTEM ACCOUNT PASSWORD RESET AND KEY RECOVERY ----------------- */}
            {activeTab === "accounts-reset" && (
              <div className="space-y-4 animate-fade-in">
                
                <div className="bg-white p-5 rounded-2xl border space-y-4">
                  <div className="border-b pb-2">
                    <h3 className="font-extrabold text-xs text-slate-950 uppercase tracking-wider flex items-center space-x-1">
                      <Lock className="h-5 w-5 text-orange-500" />
                      <span>Security & Logins Reset authority</span>
                    </h3>
                    <p className="text-[10px] text-slate-500">
                      Coordinators, Trustees, and Class Teachers can dynamically reset forgot/locked username series & passkeys here.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Reset form */}
                    <form onSubmit={handleResetUserCredentials} className="bg-slate-50 p-4 rounded-xl border space-y-3 md:col-span-1">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Reset User Key</span>
                      
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Select Active Account:</label>
                        <select 
                          value={selectedUserToReset} 
                          onChange={(e) => {
                            setSelectedUserToReset(e.target.value);
                            const acc = userAccounts.find(a => a.id === e.target.value);
                            if (acc) {
                              setResetNewUsername(acc.username);
                              setResetNewPassword(acc.password);
                            }
                          }}
                          className="w-full p-2 bg-white border text-xs rounded-lg font-bold"
                        >
                          <option value="">-- Choose Account --</option>
                          {userAccounts.map(acc => (
                            <option key={acc.id} value={acc.id}>{acc.role} - ({acc.username})</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">New Username (Needs prefix series):</label>
                        <input 
                          type="text" 
                          placeholder="e.g. TRU_NEW / CO_NEW / TEA_NEW" 
                          className="w-full p-2 bg-white border text-xs rounded-lg font-bold uppercase"
                          value={resetNewUsername}
                          onChange={(e) => setResetNewUsername(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">New Password:</label>
                        <input 
                          type="text" 
                          placeholder="Enter strong password" 
                          className="w-full p-2 bg-white border text-xs rounded-lg font-bold"
                          value={resetNewPassword}
                          onChange={(e) => setResetNewPassword(e.target.value)}
                        />
                      </div>

                      <button 
                        type="submit" 
                        className="w-full bg-slate-900 hover:bg-black text-white text-xs font-bold py-2 rounded-lg"
                      >
                        Reset & Unlock Account Key ➔
                      </button>
                    </form>

                    {/* Status register table */}
                    <div className="md:col-span-2 border rounded-xl bg-white overflow-hidden p-4 space-y-3">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Authorized Login series statuses</span>
                      <div className="space-y-2">
                        {userAccounts.map(acc => (
                          <div key={acc.id} className="p-3 bg-slate-50 border rounded-lg flex justify-between items-center text-xs font-bold">
                            <div>
                              <span className="block text-slate-900">{acc.role} Account</span>
                              <span className="text-[10px] text-slate-400">Username: <strong className="text-slate-800">{acc.username}</strong> | Password: <strong className="text-slate-800">{acc.password}</strong></span>
                            </div>

                            <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">
                              {acc.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* ----------------- TAB: SUPREME PERMISSIONS MANAGEMENT ----------------- */}
            {activeTab === "permissions" && (
              <div className="space-y-4 animate-fade-in">
                
                <div className="bg-slate-950 text-white p-5 rounded-2xl border-b-4 border-orange-500">
                  <h3 className="text-sm font-black text-white">Role Authority Control Matrix</h3>
                  <p className="text-[10px] text-slate-300 mt-0.5">Trustees hold supreme authority to dynamically configure view/write privileges across roles.</p>
                </div>

                {currentUserRole !== "Trustee" ? (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center text-xs text-red-950">
                    Supreme administrative permissions control restricted only to supreme Trustees.
                  </div>
                ) : (
                  <div className="bg-white p-4 rounded-xl border overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-600 min-w-[600px] font-bold">
                      <thead>
                        <tr className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase font-bold">
                          <th className="p-3">App Feature/Module</th>
                          <th className="p-3 text-center bg-orange-50/50">Parents Access</th>
                          <th className="p-3 text-center">Coordinator / HM</th>
                          <th className="p-3 text-center">Clerks Desk</th>
                          <th className="p-3 text-center">Class Teachers</th>
                          <th className="p-3 text-center">Subject Teachers</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {[
                          { key: "schoolData", label: "Dashboard Overview" },
                          { key: "studentDetails", label: "Detailed Student Forms" },
                          { key: "admissions", label: "Admission Pipeline tracking" },
                          { key: "fees", label: "Fees / Outstanding Alert SMS system" },
                          { key: "finance", label: "Finance ledger accounting (Master ledgers)" },
                          { key: "attendance", label: "Classroom attendance records" },
                          { key: "homework", label: "Homework diaries" },
                          { key: "transport", label: "Bus/Van Live Tracking GPS Hub" },
                          { key: "results", label: "Scholastic Results Module" },
                          { key: "progress", label: "Qualitative Progress Scales" },
                          { key: "suggestions", label: "Feedback & Suggestions portal" },
                          { key: "enterEditGrades", label: "Enter / Edit Grades Workspace" },
                          { key: "releaseMarks", label: "Release Marks to Parents" },
                          { key: "viewResults", label: "View Results" }
                        ].map(item => (
                          <tr key={item.key} className="hover:bg-slate-50/50">
                            <td className="p-3 font-semibold text-slate-900">{item.label}</td>
                            
                            {/* Parents access column */}
                            <td className="p-3 text-center bg-orange-50/30">
                              <input 
                                type="checkbox" 
                                checked={permissions["Parent"][item.key] || false}
                                onChange={() => togglePermission("Parent", item.key)}
                                className="cursor-pointer h-4 w-4 rounded text-orange-600 focus:ring-orange-500"
                              />
                            </td>

                            <td className="p-3 text-center">
                              <input 
                                type="checkbox" 
                                checked={permissions["Coordinator"][item.key]}
                                onChange={() => togglePermission("Coordinator", item.key)}
                                className="cursor-pointer h-4 w-4 text-orange-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input 
                                type="checkbox" 
                                checked={permissions["Clerk"][item.key]}
                                onChange={() => togglePermission("Clerk", item.key)}
                                className="cursor-pointer h-4 w-4 text-orange-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input 
                                type="checkbox" 
                                checked={permissions["Class Teacher"][item.key]}
                                onChange={() => togglePermission("Class Teacher", item.key)}
                                className="cursor-pointer h-4 w-4 text-orange-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input 
                                type="checkbox" 
                                checked={permissions["Subject Teacher"][item.key]}
                                onChange={() => togglePermission("Subject Teacher", item.key)}
                                className="cursor-pointer h-4 w-4 text-orange-600"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

              </div>
            )}

            {/* ----------------- TAB: PARENTS PORTAL ----------------- */}
            {activeTab === "parent-dashboard" && currentUserRole === "Parent" && (
              <div className="space-y-5 animate-fade-in">
                
                {/* Child Select Switcher */}
                <div className="bg-orange-50 p-4 rounded-xl border border-orange-200 flex flex-col sm:flex-row justify-between items-center gap-3">
                  <div>
                    <h3 className="font-extrabold text-xs text-slate-900 uppercase">Parents Secured Portal</h3>
                    <p className="text-[10px] text-slate-500 font-semibold">Real-time daily updates of your child are listed below.</p>
                  </div>

                  <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-lg border">
                    <span className="text-[10px] font-bold text-slate-500">My Child:</span>
                    <span className="text-xs font-black text-slate-900 bg-transparent px-2">
                      {activeChildObj.name} ({activeChildObj.class})
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Attendance Card */}
                  {hasAccess("attendance", "Parent") ? (
                    <div className="bg-white p-4 rounded-xl border shadow-3xs space-y-2">
                      <span className="text-[10px] font-extrabold text-slate-400 block uppercase">Attendance Report</span>
                      <h4 className="text-xl font-black text-slate-900">{activeChildObj.attendance.present} / {activeChildObj.attendance.total} days Present</h4>
                      <p className="text-[10px] text-slate-500 font-semibold">Average attendance rate: {Math.round((activeChildObj.attendance.present / activeChildObj.attendance.total) * 100) || 0}%</p>
                    </div>
                  ) : (
                    <div className="bg-slate-50 p-4 rounded-xl border border-dashed flex items-center justify-center text-xs text-slate-400 font-medium">
                      🔒 Attendance locked by admin
                    </div>
                  )}

                  {/* Fees balance Card */}
                  {hasAccess("fees", "Parent") ? (
                    <div className="bg-white p-4 rounded-xl border shadow-3xs space-y-2">
                      <span className="text-[10px] font-extrabold text-slate-400 block uppercase">Outstanding Pending Fees</span>
                      <h4 className="text-xl font-black text-red-600">₹{activeChildObj.fees.total - activeChildObj.fees.paid - activeChildObj.fees.discount} Pending</h4>
                      <p className="text-[10px] text-slate-500 font-semibold">Paid amount: ₹{activeChildObj.fees.paid}</p>
                    </div>
                  ) : (
                    <div className="bg-slate-50 p-4 rounded-xl border border-dashed flex items-center justify-center text-xs text-slate-400 font-medium">
                      🔒 Fee Details locked by admin
                    </div>
                  )}

                  {/* Homework Card */}
                  {hasAccess("homework", "Parent") ? (
                    <div className="bg-white p-4 rounded-xl border shadow-3xs space-y-2">
                      <span className="text-[10px] font-extrabold text-slate-400 block uppercase">Today's Homework Tasks</span>
                      <span className="bg-orange-50 text-orange-700 text-[10px] font-extrabold px-1.5 py-0.5 rounded">Active Topic</span>
                      <p className="text-xs text-slate-700 font-bold mt-1">"Single-digit Addition Worksheet No. 5."</p>
                    </div>
                  ) : (
                    <div className="bg-slate-50 p-4 rounded-xl border border-dashed flex items-center justify-center text-xs text-slate-400 font-medium">
                      🔒 Homework records locked by admin
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Progress, Results & Talents Card */}
                  <div className="bg-white p-4 rounded-xl border space-y-3">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase block border-b pb-1.5">Child Academic Performance</span>
                    
                    {hasAccess("viewResults", "Parent") ? (
                      <div>
                        {resultsReleased ? (
                          <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded">
                            {subjects.map((subj, idx) => (
                              <div key={idx}>
                                <strong className="text-slate-500 uppercase text-[9px] block">{subj}:</strong> 
                                <span className="font-bold text-slate-900 text-xs">{activeChildObj.results[subj] || "Pending"}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[11px] text-orange-600 font-semibold p-2 bg-orange-50 border border-orange-100 rounded">
                            ⏳ Marks have not been officially released yet.
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-400 italic font-medium p-2 bg-slate-50 rounded">🔒 Scholastic results locked by admin.</p>
                    )}
                  </div>

                  {/* Live Bus Tracking */}
                  <div className="bg-white p-4 rounded-xl border space-y-3">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase block border-b pb-1.5">Live Bus/Van Tracking Route GPS</span>
                    
                    {hasAccess("transport", "Parent") ? (
                      <div>
                        {activeChildObj.transport.usesBus ? (
                          <div>
                            {liveTrackingAccessAllowed ? (
                              <div className="space-y-2">
                                <div className="bg-slate-900 text-white p-3 rounded text-center font-mono text-[10px]">
                                  <p className="text-emerald-400 font-bold animate-pulse">● LIVE GPS ACTIVE (ONLINE)</p>
                                  <p className="mt-1">Vehicle allocated: {activeChildObj.transport.busNo}</p>
                                  <p className="text-orange-400 font-bold">Assigned Stop: {activeChildObj.transport.stop}</p>
                                </div>
                              </div>
                            ) : (
                              <div className="p-4 bg-red-50 text-center rounded text-xs text-red-900 font-medium">
                                🔒 GPS Location streaming disabled by coordinator. Please wait till route transit begins.
                              </div>
                            )}
                          </div>
                        ) : (
                          <p className="text-xs text-slate-400 italic text-center p-4">Not subscribed to school transport system.</p>
                        )}
                      </div>
                    ) : (
                      <div className="p-4 bg-slate-50 text-center rounded text-xs text-slate-400 font-medium border border-dashed">
                        🔒 Live GPS tracking module restricted by admin
                      </div>
                    )}
                  </div>
                </div>

                {/* Direct Suggestion Box */}
                {hasAccess("suggestions", "Parent") ? (
                  <div className="bg-white p-4 rounded-xl border space-y-3">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase block border-b pb-1.5">Direct Suggestions & Feedback</span>
                    
                    <div className="h-32 overflow-y-auto bg-slate-50 p-2.5 rounded-lg space-y-2 flex flex-col">
                      {parentChats.map((chat, idx) => (
                        <div key={idx} className={`max-w-xs p-2 rounded-xl text-xs ${chat.sender === "Parent" ? "bg-orange-500 text-white self-end rounded-tr-none" : "bg-slate-200 text-slate-800 self-start rounded-tl-none"}`}>
                          <span className="text-[9px] font-bold block opacity-75">{chat.sender}</span>
                          <p>{chat.text}</p>
                        </div>
                      ))}
                    </div>

                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!parentChatMsg.trim()) return;
                        setParentChats([...parentChats, { sender: "Parent", text: parentChatMsg }]);
                        setParentChatMsg("");
                        setTimeout(() => {
                          setParentChats(prev => [...prev, { sender: "School", text: "Your feedback is recorded by the Trustee administration desk." }]);
                        }, 1500);
                      }} 
                      className="flex space-x-1.5"
                    >
                      <input 
                        type="text" 
                        placeholder="Type suggestions here..." 
                        className="w-full p-2 bg-slate-50 border rounded-lg text-xs outline-none"
                        value={parentChatMsg}
                        onChange={(e) => setParentChatMsg(e.target.value)}
                      />
                      <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-bold px-4 rounded-lg transition">
                        Send
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="bg-slate-50 p-4 rounded-xl border border-dashed text-center text-xs text-slate-400 font-medium">
                    🔒 Suggestions and feedback box locked by admin
                  </div>
                )}

              </div>
            )}

          </div>

        </div>

        {/* CUSTOM MODAL FOR ADMISSION REVERTS */}
        {showCustomRevertModal && studentToRevert && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-2xl max-w-sm w-full p-6 border-4 border-slate-950 space-y-4">
              <div className="text-center">
                <span className="inline-block bg-orange-100 text-orange-600 p-2 rounded-full mb-3">
                  <XCircle className="h-8 w-8" />
                </span>
                <h3 className="text-sm font-black text-slate-950 uppercase">Cancel / Revert Admission</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Are you sure you want to revert the admission status of <span className="font-bold text-slate-900">{studentToRevert.name}</span>?
                </p>
                <p className="text-[10px] text-orange-600 font-semibold mt-2 bg-orange-50 p-2 rounded">
                  ⚠️ This action moves them back into the Document Verification Pipeline stage as a candidate.
                </p>
              </div>

              <div className="flex gap-2.5">
                <button 
                  onClick={() => {
                    setShowCustomRevertModal(false);
                    setStudentToRevert(null);
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2 rounded-xl flex-1 transition"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleRevertAdmissionConfirm}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2 rounded-xl flex-1 transition"
                >
                  Revert Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* INTEGRATED PERSISTENT LOCAL STORAGE Blueprint panel */}
        <div className="bg-slate-50 p-4 rounded-b-2xl border-t text-xs text-slate-600 space-y-2 print:hidden">
          <p className="font-extrabold text-slate-950 uppercase text-[9px] tracking-wider flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>App Verification and Data Sync Setting Blueprint:</span>
          </p>
          <p className="text-[11px]">
            This React app operates in mock storage synchronization. To deploy a production database connection (Firebase Firestore or Node.js/MySQL API), copy the blueprint configuration model in your environment using standard web services.
          </p>
        </div>

        {/* BOTTOM STATUS BAR */}
        <div className="bg-slate-900 border-t border-slate-950 p-3 text-center text-xs text-slate-400 flex justify-between items-center px-6 print:hidden">
          <span>Little Sparsh Pre-School Web Application © 2026</span>
          <span className="bg-orange-500 text-white font-black px-2.5 py-1 rounded text-[10px] uppercase tracking-widest">
            Secure Trustee Portal Active
          </span>
        </div>

      </div>

    </div>
  );
}