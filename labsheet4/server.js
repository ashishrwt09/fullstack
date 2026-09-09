const http = require('http');
const url = require('url');

const students = [
  { id: 1, name: "Alice", course: "CSE" },
  { id: 2, name: "Bob", course: "ECE" },
  { id: 3, name: "Charlie", course: "IT" }
];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (req.method === 'GET') {
    if (pathname === '/') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      return res.end("Welcome to the Student API!");
    }

    if (pathname === '/students') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(students));
    }

    const studentMatch = pathname.match(/^\/students\/(\d+)$/);
    if (studentMatch) {
      const studentId = parseInt(studentMatch[1], 10);
      const student = students.find(s => s.id === studentId);

      if (student) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(student));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: "Student not found" }));
      }
    }

    if (pathname === '/search') {
      const keyword = parsedUrl.query.keyword || 'None';
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ queryKeyword: keyword }));
    }
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end("404 Not Found");
});

server.listen(3000, () => console.log("Server running on http://localhost:3000"));