// Updated Question Database derived from uploaded Word documents
// Total Questions: 55
// Formatted with LaTeX for math and code blocks for algorithms

const questions = [
    // --- PART 1: Errors & Floating Point ---
    {
        text: "Determine the number of significant digits in the number $0.0050410$.",
        options: ["3", "4", "5", "7"],
        correct: 2 // 5, 0, 4, 1, 0 are significant
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

    // --- PART 2: Linear Algebra & Matrix Methods ---
    {
        text: "Gauss-Seidel iteration is guaranteed to converge for $Ax=b$ if the coefficient matrix $A$ is:",
        options: ["Upper triangular", "Lower triangular", "Strictly diagonally dominant", "Symmetric"],
        correct: 2
    },
    {
        text: "What are the eigenvalues of the following matrix?",
        code: "A = [[6, 3],\n     [4, 5]]",
        options: ["2 and 9", "2 and 10", "1 and 9", "2 and 7"],
        correct: 0
    },
    {
        text: "The inverse of a matrix $A$ is written as $A^{-1}$ so that $AA^{-1} = A^{-1}A$ equals:",
        options: ["Identity matrix $I$", "Null matrix $0$", "Singular matrix", "Transpose $A^T$"],
        correct: 0
    },
    {
        text: "What distinguishes the final matrix form in Gauss-Jordan elimination from standard Gaussian elimination?",
        options: ["Gauss-Jordan reduces to Upper Triangular", "Gauss-Jordan requires partial pivoting", "Gauss-Jordan reduces to Identity (Reduced Row Echelon)", "Gauss-Jordan is less stable"],
        correct: 2
    },
    {
        text: "What is the primary goal of the Power Method?",
        options: ["Find the dominant eigenvalue (largest magnitude)", "Find the smallest eigenvalue", "Find all eigenvectors", "Invert the matrix"],
        correct: 0
    },
    {
        text: "The Jacobi method for the eigenvalue problem is applicable to:",
        options: ["Symmetric matrices", "Only diagonal matrices", "Only triangular matrices", "Singular matrices"],
        correct: 0
    },
    {
        text: "In the Jacobi eigenvalue method, the rotation matrix $G$ is used to:",
        options: ["Scale the matrix", "Zero out the largest off-diagonal element", "Compute the determinant", "Find the inverse"],
        correct: 1
    },
    {
        text: "For the system $4x + y = 7$, $x + 3y = 5$, what is $x$ after one Gauss-Seidel iteration starting from $(0,0)$?",
        options: ["1.000", "1.500", "1.750", "1.167"],
        correct: 2 // x = 7/4 = 1.75
    },
    {
        text: "What does this code snippet represent?",
        code: "x[n] = b[n] / A[n][n]\nfor i = n-1 down to 1:\n    sum = 0\n    for j = i+1 to n:\n        sum += A[i][j] * x[j]\n    x[i] = (b[i] - sum) / A[i][i]",
        options: ["Forward Substitution", "Back Substitution", "LU Decomposition", "Jacobi Iteration"],
        correct: 1
    },

    // --- PART 3: Roots of Nonlinear Equations ---
    {
        text: "What is the primary requirement for the Bisection Method to guarantee convergence?",
        options: ["f'(x) must exist", "f'(x) must be non-zero", "Function must change sign over interval [a,b]", "Initial guesses must be close to root"],
        correct: 2
    },
    {
        text: "How many initial estimates does the Secant method require?",
        options: ["One ($x_0$)", "Two ($x_0, x_1$)", "Three ($x_0, x_1, x_2$)", "An interval $[a,b]$"],
        correct: 1
    },
    {
        text: "Given $f(x) = x^3 - 2x - 5$ and $f'(x) = 3x^2 - 2$, find the next approximation $x_1$ using Newton-Raphson starting at $x_0 = 2$.",
        options: ["2.0", "1.9", "2.1", "2.2"],
        correct: 2 // f(2)=-1, f'(2)=10, x1 = 2 - (-1)/10 = 2.1
    },
    {
        text: "Which method is similar to the Secant method but uses a single initial guess and requires the derivative?",
        options: ["Bisection", "Newton-Raphson", "False Position", "Fixed-Point"],
        correct: 1
    },
    {
        text: "Which method can find complex roots without using complex initial guesses?",
        options: ["Secant", "Bisection", "Müller's Method", "Newton-Raphson"],
        correct: 2
    },
    {
        text: "In the Bisection method code, if `f(a) * f(mid) < 0`, how is the interval updated?",
        options: ["a = mid", "b = mid", "Both a and b move to mid", "Return error"],
        correct: 1
    },

    // --- PART 4: Interpolation (Lagrange, Newton, Splines) ---
    {
        text: "For cubic spline interpolation with $n$ points, how many cubic polynomials are generated?",
        options: ["$n$", "$n-1$", "$n+1$", "$2n$"],
        correct: 1
    },
    {
        text: "For cubic splines, we typically enforce continuity of:",
        options: ["Function values only", "Function and 1st derivative", "Function, 1st, and 2nd derivatives", "All derivatives"],
        correct: 2
    },
    {
        text: "Which interpolation method has local control (changing one point affects only nearby intervals)?",
        options: ["Lagrange Interpolation", "Newton's Divided Difference", "Piecewise/B-Splines", "Global Polynomials"],
        correct: 2
    },
    {
        text: "Given data $x=[0,1,2,3]$, $y=[2,4,8,16]$ (which is $2^{x+1}$), estimate $f''(0)$ using Newton's forward difference formula (1st term approximation).",
        options: ["8", "4", "6", "2"],
        correct: 3 // Delta^2 y0 = 2. f'' approx 2/h^2 = 2.
    },
    {
        text: "Calculate the second backward difference $\\nabla^2 y_3$ for the data $y=[1, 2, 4, 8]$.",
        options: ["1", "4", "2", "8"],
        correct: 2 // y3-2y2+y1 = 8 - 8 + 2 = 2.
    },
    {
        text: "The first divided difference $f[x_i, x_j]$ is defined as:",
        options: ["$(f(x_j) - f(x_i)) / (x_j - x_i)$", "$(f(x_j) + f(x_i)) / (x_j - x_i)$", "$f(x_j) - f(x_i)$", "$(f(x_j) - f(x_i)) / h$"],
        correct: 0
    },
    {
        text: "Newton's Forward Interpolation formula uses variable $u$ defined as:",
        options: ["$u = x - x_0$", "$u = (x - x_0) / h$", "$u = (x - x_n) / h$", "$u = h(x - x_0)$"],
        correct: 1
    },
    {
        text: "What does the following Python code calculate?",
        code: "for i in range(1, n):\n    diff = table[i-1]\n    cur = [diff[j+1] - diff[j] for j in range(n-i)]\n    table.append(cur)",
        options: ["Backward Difference Table", "Forward Difference Table", "Lagrange Coefficients", "Divided Differences"],
        correct: 1
    },
    {
        text: "Using Lagrange interpolation for points $(1,2), (2,4), (3,8), (4,16)$, estimate value at $x=2.5$.",
        options: ["5.625", "3.0", "6.527", "4.5"],
        correct: 0
    },

    // --- PART 5: Numerical Integration ---
    {
        text: "What does this Trapezoidal Rule function return for $f(x)=x^2$ on $[0,2]$ with $n=4$?",
        code: "h = (2-0)/4  # h=0.5\n# Points: 0, 0.5, 1.0, 1.5, 2.0\n# Values: 0, 0.25, 1, 2.25, 4\nresult = (h/2) * (y0 + 2*y1 + 2*y2 + 2*y3 + y4)",
        options: ["2.25", "2.667", "2.75", "3.0"],
        correct: 2
    },
    {
        text: "Simpson's 3/8 rule uses the formula:",
        options: ["$\\frac{3h}{8} [f_0 + 3f_1 + 3f_2 + f_3]$", "$\\frac{3h}{8} [f_0 + 2f_1 + 2f_2 + f_3]$", "$\\frac{h}{3} [f_0 + 4f_1 + f_2]$", "$\\frac{2h}{45} [7f_0 + ...]$"],
        correct: 0
    },
    {
        text: "Using Simpson's 3/8 rule for $\\int_0^3 x^3 dx$ with $h=1$ gives:",
        options: ["18.75", "20.25", "22.50", "21.00"],
        correct: 1 // Exact is 20.25. Simpson 3/8 is exact for cubic.
    },
    {
        text: "Which rule is typically optimal for 13 equally spaced points (12 intervals)?",
        options: ["Simpson's 1/3 rule (entirely)", "Boole's rule (applied 3 times)", "Weddle's rule (applied 2 times)", "All of the above work"],
        correct: 3
    },
    {
        text: "The weights for Boole's rule (5 points) are:",
        options: ["1, 4, 2, 4, 1", "7, 32, 12, 32, 7", "1, 3, 3, 1", "1, 2, 2, 1"],
        correct: 1
    },
    {
        text: "What is the primary disadvantage of Weddle's rule compared to the Trapezoidal rule?",
        options: ["It is less accurate", "It requires more function evaluations and specific n", "It cannot integrate polynomials", "It is unstable"],
        correct: 1
    },
    {
        text: "Newton-Cotes formulas are based on the idea of:",
        options: ["Monte Carlo sampling", "Replacing integrand with interpolating polynomial", "Taylor series expansion", "Differentiation"],
        correct: 1
    },

    // --- PART 6: ODEs (Euler, RK, etc.) ---
    {
        text: "What is the global error order of Euler's method?",
        options: ["$O(h)$", "$O(h^2)$", "$O(h^3)$", "$O(h^4)$"],
        correct: 0
    },
    {
        text: "Solve $y' = 2, y(0)=0$ with step $h=0.5$ for $y(1)$ using Euler's method.",
        options: ["1.0", "1.5", "2.0", "2.5"],
        correct: 2 // y(0.5)=1, y(1)=2
    },
    {
        text: "Solve $y' = -2y, y(0)=1$ with $h=0.1$ for $y(0.2)$ using Euler's method.",
        options: ["0.90", "0.81", "0.72", "0.64"],
        correct: 3 // y1 = 1 - 0.2 = 0.8; y2 = 0.8 - 0.16 = 0.64
    },
    {
        text: "Which formula represents the Modified Euler's Method (Predictor-Corrector)?",
        options: [
            "$y_{n+1} = y_n + h f(x_n, y_n)$",
            "$y_{n+1} = y_n + \\frac{h}{2} [f(x_n, y_n) + f(x_{n+1}, y_{pred})]$",
            "$y_{n+1} = y_n + h f(x_n + h/2, y_n + k_1/2)$",
            "$y_{n+1} = y_n + h f(x_{n+1}, y_{n+1})$"
        ],
        correct: 1
    },
    {
        text: "Identify the correct formula for $k_3$ in the classic Runge-Kutta 4th Order (RK4) method.",
        options: [
            "$k_3 = h f(x_n + h/2, y_n + k_1/2)$",
            "$k_3 = h f(x_n + h/2, y_n + k_2/2)$",
            "$k_3 = h f(x_n + h, y_n + k_2)$",
            "$k_3 = h f(x_n + h, y_n + 2k_2)$"
        ],
        correct: 1
    },
    {
        text: "The 3rd Order Runge-Kutta formula (Kutta's version) uses which pattern for $k_3$?",
        options: [
            "$k_3 = h f(x_n + h, y_n - k_1 + 2k_2)$",
            "$k_3 = h f(x_n + h/2, y_n + k_2/2)$",
            "$k_3 = h f(x_n + h, y_n + k_2)$",
            "$k_3 = h f(x_n + 2h/3, y_n + 2k_2/3)$"
        ],
        correct: 0
    },
    {
        text: "Picard's method is based on:",
        options: ["Numerical differentiation", "Iterative solution of an integral equation", "Taylor series", "Matrix inversion"],
        correct: 1
    },
    {
        text: "For $y' = x^2 + y, y(0)=1$, find $y''(0)$ using Taylor series derivation.",
        options: ["$2x + y'$", "$1$", "$2$", "$0$"],
        correct: 1 // y' = x^2+y. y'' = 2x+y'. At x=0: y'(0)=1. y''(0) = 0 + 1 = 1.
    },
    {
        text: "Comparing Euler and Modified Euler for $y'=2x, y(0)=0, h=1$. Euler gives $y_1=0$. Modified Euler gives:",
        options: ["0.5", "1.0", "0.25", "2.0"],
        correct: 1 // k1=0. y_pred=0. k2=2(1)=2. y_new = 0 + 0.5(0+2) = 1.
    },

    // --- PART 7: Code Analysis & Algorithms ---
    {
        text: "What is the issue with this Bisection code snippet?",
        code: "while (b - a) / 2 > tol:\n    mid = (a + b) / 2\n    if f(mid) == 0: return mid\n    elif f(a) * f(mid) < 0: b = mid\n    else: a = mid",
        options: ["Infinite loop", "Incorrect interval update", "No issue (Code is correct)", "Calculates wrong midpoint"],
        correct: 2
    },
    {
        text: "Which Python function signature best fits a general ODE solver?",
        code: "def solve_ode(f, x0, y0, h, n): ...",
        options: ["f is the derivative function dy/dx", "f is the analytical solution", "f is an array of points", "h is the final x value"],
        correct: 0
    },
    {
        text: "What is being calculated in this loop?",
        code: "for i in range(n):\n    for j in range(i+1, n):\n        factor = A[j][i] / A[i][i]\n        ...",
        options: ["Matrix Multiplication", "Gaussian Elimination (Forward Elimination)", "Back Substitution", "Determinant only"],
        correct: 1
    },
    {
        text: "Given the table `x=[0,1,2,3], y=[2,4,8,16]`. What is the value of the 2nd Order Forward Difference $\\Delta^2 y_0$?",
        options: ["2", "4", "1", "6"],
        correct: 0 // (8-4) - (4-2) = 4-2=2
    },
    {
        text: "Weddle's Rule is a Newton-Cotes formula for $n=$?",
        options: ["4", "5", "6", "3"],
        correct: 2 // 6 intervals (7 points)
    },
    {
        text: "The error term for Simpson's 1/3 rule depends on which derivative?",
        options: ["$f^{(2)}$", "$f^{(3)}$", "$f^{(4)}$", "$f^{(1)}$"],
        correct: 2
    },
    {
        text: "Which method requires the system matrix to be diagonally dominant for guaranteed convergence?",
        options: ["Gaussian Elimination", "Gauss-Seidel", "Cramer's Rule", "LU Decomposition"],
        correct: 1
    },
    {
        text: "A rectangular system $m \\times n$ ($m \\neq n$) can be solved using:",
        options: ["Inverse Matrix", "Cramer's Rule", "Pseudo-Inverse / Least Squares", "Determinants"],
        correct: 2
    },
    {
        text: "What is the formula for the Secant Method update?",
        options: [
            "$x_{n+1} = x_n - f(x_n) \\frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}$",
            "$x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$",
            "$x_{n+1} = \\frac{a+b}{2}$",
            "$x_{n+1} = g(x_n)$"
        ],
        correct: 0
    },
    {
        text: "If a function $f(x)$ is continuous on $[a,b]$ and $f(a)f(b) < 0$, then:",
        options: ["There is no root", "There is at least one root", "There are exactly two roots", "The function is linear"],
        correct: 1
    }
];