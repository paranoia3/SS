// Complete Question Database
// Total Questions: 76
// Formatted with LaTeX for math ($...$)

const questions = [
    // --- PART 1: Errors & Floating Point ---
    {
        text: "Determine the number of significant digits in the number $0.0050410$.",
        options: ["3", "4", "5", "7"],
        correct: 2 // 5, 0, 4, 1, 0
    },
    {
        text: "In floating point arithmetic, machine epsilon measures:",
        options: ["The smallest relative spacing between representable numbers", "The underflow limit", "The overflow limit", "The largest representable number"],
        correct: 0
    },
    {
        text: "Which error measure is most suitable for comparing approximations of very different magnitudes (e.g., $a=0.01$ vs $b=1000$)?",
        options: ["Absolute error", "Relative error", "Truncation error", "Round-off error"],
        correct: 1
    },

    // --- PART 2: Linear Algebra (Methods & Theory) ---
    {
        text: "In the iterative method for matrix inversion, the error matrix $E$ is typically defined as:",
        options: ["$E = AB - I$", "$E = I - AB$", "$E = A - B$", "$E = B - A^{-1}$"],
        correct: 0
    },
    {
        text: "Which condition guarantees convergence for both Jacobi and Gauss-Seidel methods for solving $Ax=b$?",
        options: ["The spectral radius $\\rho(T) < 1$", "$A$ is tridiagonal", "$A$ is strictly diagonally dominant", "$A$ has no zero diagonal elements"],
        correct: 0 // Spectral radius < 1 is the necessary and sufficient condition
    },
    {
        text: "Gauss-Seidel iteration is guaranteed to converge if the coefficient matrix $A$ is:",
        options: ["Strictly diagonally dominant", "Upper triangular", "Lower triangular", "Symmetric"],
        correct: 0
    },
    {
        text: "What is the final form of the augmented matrix after successful Gauss-Jordan elimination?",
        options: ["$[ I \\mid x ]$ (Identity)", "$[ U \\mid y ]$ (Upper triangular)", "$[ L \\mid z ]$ (Lower triangular)", "$[ D \\mid w ]$ (Diagonal)"],
        correct: 0
    },
    {
        text: "What distinguishes the final matrix form in Gauss-Jordan elimination from standard Gaussian elimination?",
        options: ["Gauss-Jordan gives Reduced Row Echelon Form (Identity-like)", "Gauss-Jordan gives Upper Triangular", "Gauss-Jordan requires partial pivoting", "Gauss-Jordan is less stable"],
        correct: 0
    },
    {
        text: "What does this function compute in Gaussian elimination?",
        code: "for i in range(n):\n    for j in range(i+1, n):\n        factor = A[j][i] / A[i][i]\n        for k in range(i, n): A[j][k] -= factor * A[i][k]",
        options: ["Upper triangular matrix", "Lower triangular matrix", "Identity matrix", "Diagonal matrix"],
        correct: 0
    },
    {
        text: "Why is Gauss-Seidel typically faster than Jacobi for large systems?",
        options: ["It uses updated values immediately", "It requires fewer operations per iteration", "It avoids storing two vectors", "It exploits sparsity better"],
        correct: 0
    },
    {
        text: "The relaxation method with $\\omega=1$ is equivalent to:",
        options: ["Gauss-Seidel method", "Jacobi method", "Gauss elimination", "No method"],
        correct: 0
    },
    {
        text: "For the system $4x + y = 7$, $x + 3y = 5$, what is $x$ after one Gauss-Seidel iteration starting from $(0,0)$?",
        options: ["1.750", "1.000", "1.500", "1.167"],
        correct: 0 // x = 7/4 = 1.75
    },
    {
        text: "Which code correctly implements the Gauss-Seidel method?",
        code: "x_new[i] = (b[i] - sum(A[i][j]*x_new[j] for j < i) - sum(A[i][j]*x_old[j] for j > i)) / A[i][i]",
        options: ["Using updated values for j<i", "Using old values for all j", "Using updated values for j>i", "Using b[i] only"],
        correct: 0
    },
    {
        text: "The inverse of a matrix $A$ is written as $A^{-1}$ so that $AA^{-1} = A^{-1}A$ equals:",
        options: ["Identity matrix $I$", "Null matrix $0$", "Singular matrix", "Transpose $A^T$"],
        correct: 0
    },

    // --- PART 3: Eigenvalues ---
    {
        text: "What is the primary goal of the Power Method?",
        options: ["Find the dominant eigenvalue (largest magnitude)", "Find the smallest eigenvalue", "Find all eigenvectors", "Invert the matrix"],
        correct: 0
    },
    {
        text: "How is the dominant eigenvalue estimated in the Power method?",
        options: ["Using the Rayleigh quotient $\\lambda_k = (v_k^T A v_k) / (v_k^T v_k)$", "By computing trace(A)", "By solving $\\det(A-\\lambda I)=0$", "By averaging diagonal elements"],
        correct: 0
    },
    {
        text: "The Jacobi method for a symmetric matrix $A$ can be viewed as:",
        options: ["Minimizing the sum of squares of off-diagonal elements", "Maximizing the determinant", "Minimizing the condition number", "Maximizing the diagonal elements"],
        correct: 0
    },
    {
        text: "Which method is most efficient/suitable for finding all eigenvalues of a symmetric matrix?",
        options: ["Jacobi method", "Power method", "Cramer's rule", "Gaussian elimination"],
        correct: 0
    },
    {
        text: "In the Jacobi eigenvalue method, the rotation angle $\\theta$ is chosen to satisfy:",
        options: ["$\\tan(2\\theta) = 2a_{pq} / (a_{pp} - a_{qq})$", "$\\cos(2\\theta) = a_{pq}$", "$\\sin(2\\theta) = 1$", "$\\theta = 45^\\circ$"],
        correct: 0
    },
    {
        text: "What are the eigenvalues of the matrix A?",
        code: "A = [[6, 3],\n     [4, 5]]",
        options: ["2 and 9", "2 and 10", "1 and 9", "2 and 7"],
        correct: 0
    },
    {
        text: "In the Jacobi method, the rotation matrix $G$ is used to:",
        options: ["Zero out the largest off-diagonal element", "Scale the matrix", "Compute the determinant", "Find the inverse"],
        correct: 0
    },

    // --- PART 4: Nonlinear Equations (Roots) ---
    {
        text: "In the Newton-Raphson method, the formula for $x_{n+1}$ is:",
        options: ["$x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$", "$x_{n+1} = x_n - f(x_n)$", "$x_{n+1} = x_n - \\frac{f'(x_n)}{f(x_n)}$", "$x_{n+1} = \\frac{a+b}{2}$"],
        correct: 0
    },
    {
        text: "In the Secant method, the formula for $x_{n+1}$ is:",
        options: ["$x_{n+1} = x_n - f(x_n) \\frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}$", "$x_{n+1} = \\frac{x_n + x_{n-1}}{2}$", "$x_{n+1} = g(x_n)$", "$x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$"],
        correct: 0
    },
    {
        text: "In the Fixed-Point iteration, the formula is:",
        options: ["$x_{n+1} = g(x_n)$", "$x_{n+1} = x_n - f(x_n)$", "$x_{n+1} = \\frac{a+b}{2}$", "$x_{n+1} = f(x_n)$"],
        correct: 0
    },
    {
        text: "What is the primary requirement for the Bisection Method to guarantee convergence?",
        options: ["Function must change sign ($f(a)f(b) < 0$)", "f'(x) must be non-zero", "Initial guess must be close", "Function must be polynomial"],
        correct: 0
    },
    {
        text: "Which method can find complex roots without using complex initial guesses?",
        options: ["Müller's Method", "Bisection", "Secant", "Newton-Raphson"],
        correct: 0
    },
    {
        text: "Given $f(x) = x^3 - 2x - 5$ and $f'(x) = 3x^2 - 2$, find $x_1$ using Newton-Raphson with $x_0 = 2$.",
        options: ["2.1", "2.0", "1.9", "2.2"],
        correct: 0
    },
    {
        text: "Which code correctly implements the bisection interval update?",
        options: ["if f(a)*f(mid) < 0: b=mid else: a=mid", "if f(a)*f(mid) > 0: b=mid", "a, b = mid, mid", "b = a + mid"],
        correct: 0
    },

    // --- PART 5: Interpolation ---
    {
        text: "The Lagrange basis polynomial $L_i(x)$ for point $(x_i, y_i)$ has what property?",
        options: ["$L_i(x_i) = 1$ and $L_i(x_j) = 0$ for $j \\neq i$", "$L_i(x_i) = y_i$", "$L_i(x)$ integrates to 1", "$L_i(x_i) = 0$"],
        correct: 0
    },
    {
        text: "Newton's Forward Interpolation formula uses $u$ defined as:",
        options: ["$u = (x - x_0) / h$", "$u = x - x_0$", "$u = (x - x_n) / h$", "$u = h(x - x_0)$"],
        correct: 0
    },
    {
        text: "The first divided difference $f[x_i, x_j]$ is defined as:",
        options: ["$\\frac{f(x_j) - f(x_i)}{x_j - x_i}$", "$f(x_j) - f(x_i)$", "$\\frac{f(x_j) + f(x_i)}{x_j - x_i}$", "$\\frac{f(x_j) - f(x_i)}{h}$"],
        correct: 0
    },
    {
        text: "Which interpolation method has local control (changing one point affects only nearby intervals)?",
        options: ["Piecewise/Cubic Splines", "Lagrange Interpolation", "Newton Forward", "Global Polynomials"],
        correct: 0
    },
    {
        text: "For cubic splines, we typically enforce continuity of:",
        options: ["Function, 1st, and 2nd derivatives", "Function values only", "All derivatives", "1st derivative only"],
        correct: 0
    },
    {
        text: "Using Lagrange interpolation for points $(1,2), (2,4), (3,8), (4,16)$, estimate value at $x=2.5$.",
        options: ["5.625", "6.5", "5.0", "6.0"],
        correct: 0
    },
    {
        text: "Given data $x=[0,1,2,3]$, $y=[2,4,8,16]$, calculate $\\Delta^2 y_0$.",
        options: ["2", "4", "1", "6"],
        correct: 0 // (8-4)-(4-2) = 2
    },
    {
        text: "What does this Python code calculate?",
        code: "for i in range(1, n):\n    diff = table[i-1]\n    cur = [diff[j+1] - diff[j] for j in range(n-i)]",
        options: ["Forward difference table", "Backward difference table", "Divided difference table", "Lagrange table"],
        correct: 0
    },

    // --- PART 6: Numerical Integration ---
    {
        text: "Simpson's 3/8 rule uses the formula:",
        options: ["$\\frac{3h}{8} [f_0 + 3f_1 + 3f_2 + f_3]$", "$\\frac{3h}{8} [f_0 + 2f_1 + 2f_2 + f_3]$", "$\\frac{h}{3} [f_0 + 4f_1 + f_2]$", "$\\frac{2h}{45} [7f_0...]$"],
        correct: 0
    },
    {
        text: "For 13 equally spaced points (12 intervals), which combination is optimal?",
        options: ["Weddle's rule twice (6+6 intervals)", "Boole's rule 3 times", "Simpson's 1/3 rule", "Trapezoidal rule"],
        correct: 0
    },
    {
        text: "For composite integration with 9 equally spaced points (8 intervals), Boole's rule is applied:",
        options: ["Twice: first 5 points and last 5 points", "Once", "Three times", "Cannot be applied"],
        correct: 0
    },
    {
        text: "Weddle's rule is generally more accurate because:",
        options: ["It uses 7 points (deg 6 poly)", "It uses more points", "It uses unequal intervals", "It is for derivatives"],
        correct: 0
    },
    {
        text: "What is the value of $\\int_0^2 x^3 dx$ using Simpson's 1/3 rule with $h=1$?",
        options: ["4.0", "3.5", "5.0", "3.0"],
        correct: 0 // Exact 4. Simpson is exact for cubic.
    },
    {
        text: "What will this function return for $f(x)=x^2$ from 0 to 2 with $n=4$?",
        code: "h = (b-a)/n; res = (f(a)+f(b))/2; for i in range(1,n): res += f(a+i*h); return res*h",
        options: ["2.75", "2.25", "2.66", "3.0"],
        correct: 0 // Trapezoidal rule
    },
    {
        text: "The weights for Boole's rule (5 points) are proportional to:",
        options: ["7, 32, 12, 32, 7", "1, 4, 2, 4, 1", "1, 3, 3, 1", "1, 1, 1, 1"],
        correct: 0
    },

    // --- PART 7: ODEs (Euler, RK, etc.) ---
    {
        text: "What is the global error order of Euler's method?",
        options: ["$O(h)$", "$O(h^2)$", "$O(h^3)$", "$O(h^4)$"],
        correct: 0
    },
    {
        text: "Modified Euler method formula is:",
        options: ["$y_{n+1} = y_n + \\frac{h}{2} [f(x_n, y_n) + f(x_{n+1}, y_{pred})]$", "$y_{n+1} = y_n + h f(x_n, y_n)$", "$y_{n+1} = y_n + h f(x_{n+1}, y_{n+1})$", "RK4 formula"],
        correct: 0
    },
    {
        text: "Identify the correct formula for $k_3$ in RK4:",
        options: ["$k_3 = hf(x_n + h/2, y_n + k_2/2)$", "$k_3 = hf(x_n + h/2, y_n + k_1/2)$", "$k_3 = hf(x_n + h, y_n + k_2)$", "$k_3 = hf(x_n + h, y_n + 2k_2)$"],
        correct: 0
    },
    {
        text: "The 3rd Order RK formula uses which pattern for $k_3$?",
        options: ["$k_3 = hf(x_n + h, y_n - k_1 + 2k_2)$", "$k_3 = hf(x_n + h, y_n + k_2)$", "$k_3 = hf(x_n + h/2, y_n + k_2/2)$", "None"],
        correct: 0
    },
    {
        text: "Picard's method is based on:",
        options: ["Iterative solution of integral equation", "Numerical differentiation", "Taylor series", "Matrix operations"],
        correct: 0
    },
    {
        text: "For $y' = x^2 + y, y(0)=1$, find $y''(0)$ using Taylor series.",
        options: ["$1$", "$2$", "$0$", "$3$"],
        correct: 0 // y'' = 2x + y'. y'(0)=1. y''(0)=0+1=1.
    },
    {
        text: "Comparing Euler and Modified Euler for $y'=2x, y(0)=0, h=1$. Euler gives 0. Modified Euler gives:",
        options: ["1.0", "0.5", "2.0", "0.25"],
        correct: 0
    },
    {
        text: "Solve $y' = -2y, y(0)=1, h=0.1$ for $y(0.2)$ using Euler's method.",
        options: ["0.64", "0.72", "0.81", "0.90"],
        correct: 0
    },

    // --- PART 8: Code Analysis & Checks ---
    {
        text: "What does this code check? `if abs(A[i][i]) <= sum(abs(A[i][j]) for j!=i)`",
        options: ["Diagonally Dominant condition", "Symmetry", "Positive Definite", "Singularity"],
        correct: 0
    },
    {
        text: "What will this function return for A=[[3,1,1],[0,4,1],[1,1,5]]?",
        code: "func check(A): checks strict diagonal dominance",
        options: ["True", "False", "Error", "None"],
        correct: 0
    },
    {
        text: "What is the issue with this Jacobi code snippet for finding largest off-diagonal?",
        options: ["Should check only upper triangle (symmetry optimization)", "No error", "Should check diagonal", "Should use square"],
        correct: 0
    },
    {
        text: "In LU decomposition code, `U[i][j] = A[i][j] - sum(...)`. This corresponds to:",
        options: ["Crout/Doolittle algorithm", "Cholesky", "QR", "SVD"],
        correct: 0
    },
    {
        text: "Which Python function signature best fits a general ODE solver?",
        code: "def solve(f, x0, y0, h, n)",
        options: ["Correct", "Missing f", "Missing initial condition", "Wrong parameters"],
        correct: 0
    },

    // --- PART 9: Theory & Definitions ---
    {
        text: "A rectangular system $m \\times n$ ($m \\neq n$) can be solved using:",
        options: ["Pseudo-Inverse / Least Squares", "Cramer's Rule", "Determinant", "Inverse Matrix"],
        correct: 0
    },
    {
        text: "Condition number $\\kappa(A)$ measures:",
        options: ["Sensitivity of output to input changes", "Matrix size", "Determinant value", "Number of zeros"],
        correct: 0
    },
    {
        text: "Orthogonal matrices have a condition number of:",
        options: ["1", "0", "Infinity", "Undefined"],
        correct: 0
    },
    {
        text: "Newton-Cotes formulas are based on:",
        options: ["Replacing integrand with interpolating polynomial", "Monte Carlo", "Taylor Series", "Derivatives"],
        correct: 0
    },
    {
        text: "Which method requires $f(a)f(b) < 0$?",
        options: ["Bisection", "Newton-Raphson", "Secant", "Fixed-point"],
        correct: 0
    },
    {
        text: "In floating point, machine epsilon is:",
        options: ["Smallest number such that $1.0 + \\epsilon \\neq 1.0$", "Smallest positive number", "Largest number", "Zero"],
        correct: 0
    },
    {
        text: "How many significant digits in $0.0050410$?",
        options: ["5", "4", "3", "7"],
        correct: 0
    },
    {
        text: "Using Neumann series, $A^{-1}$ can be approximated if $A=I-E$ by:",
        options: ["$I + E + E^2 + \\dots$", "$I - E$", "$E - I$", "$I + E$"],
        correct: 0
    },
    {
        text: "Correct formula for Muller's method denominator to ensure stability:",
        options: ["$b + \\text{sgn}(b)\\sqrt{b^2-4ac}$", "$b - \\sqrt{b^2-4ac}$", "$b$", "$2a$"],
        correct: 0
    },
    {
        text: "Calculate the second backward difference $\\nabla^2 y_3$ for $y=[1,2,4,8]$.",
        options: ["2", "1", "4", "8"],
        correct: 0 // y3-2y2+y1 = 8-8+2 = 2. But wait, y3=8, y2=4, y1=2. 8 - 2(4) + 2 = 2.
    },
    {
        text: "Cramer's rule is computationally efficient for:",
        options: ["Very small systems only", "Large systems", "Sparse matrices", "All systems"],
        correct: 0
    },
    {
        text: "What is the global error of Euler's method?",
        options: ["$O(h)$", "$O(h^2)$", "$O(h^3)$", "None"],
        correct: 0
    },
    {
        text: "Solve $y' = 2, y(0)=0$ with step $h=0.5$ for $y(1)$ using Euler.",
        options: ["2.0", "1.5", "1.0", "2.5"],
        correct: 0
    },
    {
        text: "Which method is similar to Secant but uses one initial guess?",
        options: ["Newton-Raphson", "Bisection", "False Position", "Fixed Point"],
        correct: 0
    },
    {
        text: "For cubic splines with $n+1$ points, how many polynomials?",
        options: ["$n$", "$n+1$", "$n-1$", "$2n$"],
        correct: 0
    },
    {
        text: "Simpson's error depends on:",
        options: ["$f^{(4)}$", "$f^{(2)}$", "$f^{(3)}$", "$f^{(1)}$"],
        correct: 0
    },
    {
        text: "What is the issue with `while (b-a)/2 > tol` in Bisection?",
        options: ["No iteration limit (possible infinite loop)", "Wrong logic", "Syntax error", "None"],
        correct: 0
    }
];