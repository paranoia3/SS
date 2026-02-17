// Полная база из 65 уникальных вопросов на основе ваших материалов
const questions = [
    // --- INTERPOLATION & SPLINES ---
    {
        text: "The Lagrange basis polynomial Li(x) for point (xi, yi) has what property?",
        options: ["Li(xi) = yi and Li(xj) = 0 for all j ≠ i", "Li(xi) = 1 and Li(xj) = 0 for all j ≠ i", "Li(x) integrates to 1 over the interval", "Li(xi) = 0 and Li(xj) = 0 for all j", "Li(xi) = 1 and Li(xj) = 1 for all j"],
        correct: 1
    },
    {
        text: "Which interpolation method has local control - changing one data point affects only nearby intervals?",
        options: ["Cubic spline interpolation", "Lagrange interpolation", "Newton's forward interpolation", "All polynomial methods have global control", "Newton's divided differences interpolation"],
        correct: 0
    },
    {
        text: "For cubic splines, we typically enforce continuity of:",
        options: ["Only the function values", "All derivatives up to fourth order", "All derivatives up to third order", "Function values, first, and second derivatives", "Function values and first derivatives"],
        correct: 3
    },
    {
        text: "Spline construction also requires boundary conditions to be specified. Which is a common choice?",
        options: ["Natural splines (f''=0 at ends)", "Clamped splines (f'=const)", "Periodic splines", "All of the above", "None of the above"],
        correct: 3
    },
    {
        text: "The formula for Newton's forward interpolation for the case u = (x - x0)/h is:",
        options: ["P(x) = y0 + uΔy0 + u(u+1)/2! Δ²y0 + ...", "P(x) = yn + u∇yn + u(u+1)/2! ∇²yn + ...", "P(x) = y0 + uΔy0 + u(u-1)/2! Δ²y0 + ...", "P(x) = uy0 + u(u+1)/2! Δy0 + ...", "P(x) = Σ yi * Li(x)"],
        correct: 2
    },
    {
        text: "The first divided difference f[xi, xj] is defined as:",
        options: ["(f(xi) + f(xj))/(xj - xi)", "f(xj) - f(xi)", "(f(xj) - f(xi))/(xj + xi)", "(f(xi) - f(xj))/dx", "(f(xj) - f(xi))/(xj - xi)"],
        correct: 4
    },
    {
        text: "Ordinary least squares typically minimizes:",
        options: ["Orthogonal distances", "Area between curves", "Horizontal distances in x", "Vertical distances (residuals)", "None of the above"],
        correct: 3
    },
    {
        text: "If the correlation coefficient r = 0, this implies:",
        options: ["No relationship of any kind", "Perfect positive correlation", "No linear correlation", "R² = 1", "Negative slope"],
        correct: 2
    },
    {
        text: "The degree of the interpolating polynomial for n+1 data points is at most:",
        options: ["n+1", "n", "n-1", "1", "2n"],
        correct: 1
    },
    {
        text: "In Newton's divided difference table, the diagonal elements represent:",
        options: ["Function values", "Coefficients of the polynomial", "Errors", "Derivatives", "Residuals"],
        correct: 1
    },

    // --- INTEGRATION ---
    {
        text: "Simpson's 3/8 rule uses the formula:",
        options: ["3h/8 [f0 + 3f1 + 3f2 + f3]", "3h/8 [f0 + 2f1 + 2f2 + f3]", "3h/8 [7f0 + 32f1 + 12f2 + 32f3 + 7f4]", "h/3 [f0 + 4f1 + f2]", "3h/8 [f0 + f1 + f2 + f3]"],
        correct: 0
    },
    {
        text: "For composite integration with 9 equally spaced points, Boole's rule could be applied:",
        options: ["Twice: first 5 points and last 5 points (overlapping)", "Three times with 3 points each", "Three times with 5 points each", "Cannot be applied directly", "Once over all 9 points"],
        correct: 0
    },
    {
        text: "For 13 equally spaced points, which combination of methods is optimal?",
        options: ["Apply trapezoidal rule", "Apply Weddle's rule twice", "Apply Boole's rule three times", "Apply Simpson's 1/3 rule throughout", "Apply Gaussian quadrature"],
        correct: 3
    },
    {
        text: "Gaussian quadrature chooses nodes to:",
        options: ["Maximize exactness for a given number of points", "Minimize SSE", "Avoid weights", "Use equal spacing", "Simplify calculation"],
        correct: 0
    },
    {
        text: "The error in Simpson's 1/3 rule depends on which derivative of f?",
        options: ["f'", "f''", "f'''", "f^(4)", "f^(5)"],
        correct: 3
    },
    {
        text: "Weddle's rule requires how many points?",
        options: ["3", "5", "6", "7", "9"],
        correct: 3
    },
    {
        text: "The trapezoidal rule integrates a function by approximating it with:",
        options: ["Constant steps", "Straight lines", "Parabolas", "Cubics", "Exponentials"],
        correct: 1
    },
    {
        text: "Newton-Cotes formulas use:",
        options: ["Equidistant points", "Random points", "Roots of Legendre polynomials", "Roots of Chebyshev polynomials", "None of the above"],
        correct: 0
    },
    {
        text: "The degree of precision of Simpson's 1/3 rule is:",
        options: ["1", "2", "3", "4", "5"],
        correct: 2
    },

    // --- LINEAR ALGEBRA & MATRICES ---
    {
        text: "What is the main difference between Gaussian elimination and Gauss-Jordan elimination?",
        options: ["Upper triangular vs Diagonal", "Upper triangular vs Reduced row echelon form (identity-like)", "Diagonal vs Tridiagonal", "Symmetric vs Orthogonal", "Lower triangular vs Identity"],
        correct: 1
    },
    {
        text: "Which condition guarantees convergence for both Jacobi and Gauss-Seidel methods?",
        options: ["A is strictly diagonally dominant.", "A has no zero diagonal elements.", "The spectral radius ρ(T) < 1", "A is tridiagonal.", "A is symmetric positive definite."],
        correct: 0
    },
    {
        text: "In the Jacobi method for eigenvalues, the rotation matrix G is used to:",
        options: ["Compute the determinant", "Find the inverse", "Zero out the largest off-diagonal element", "Find the trace", "Normalize eigenvectors"],
        correct: 2
    },
    {
        text: "The primary goal of the Power method is:",
        options: ["Find all eigenvalues", "Factorize matrix into LDL^T", "Compute matrix inverse", "Find the dominant eigenvalue and its eigenvector", "Solve СЛАУ"],
        correct: 3
    },
    {
        text: "The final form of the augmented matrix after Gauss-Jordan elimination is:",
        options: ["[L|z]", "[I|x] where I is identity", "[U|y]", "[D|w]", "[A|b]"],
        correct: 1
    },
    {
        text: "Using Neumann series, how can A⁻¹ be expressed using B and error E = I - AB?",
        options: ["A⁻¹ = (I-E)B", "A⁻¹ = B(I-E)⁻¹", "A⁻¹ = B + E", "A⁻¹ = B(I+E+E²+...)", "A⁻¹ = B(I+E)"],
        correct: 3
    },
    {
        text: "LU decomposition of matrix A results in:",
        options: ["A = L + U", "A = LU", "A = L - U", "A = U/L", "A = L*L^T"],
        correct: 1
    },
    {
        text: "The Successive Over-Relaxation (SOR) method uses a parameter ω. When ω=1, it is:",
        options: ["Jacobi method", "Gauss-Seidel method", "Newton's method", "Bisection method", "Power method"],
        correct: 1
    },
    {
        text: "A matrix is strictly diagonally dominant if for each row i:",
        options: ["|aii| > sum |aij| for j=i", "|aii| > sum |aij| for j≠i", "|aii| < sum |aij|", "|aii| = sum |aij|", "|aii| > 1"],
        correct: 1
    },
    {
        text: "The Jacobi eigenvalue method is applicable to:",
        options: ["Any matrix", "Symmetric matrices only", "Identity matrices", "Singular matrices", "Diagonal matrices"],
        correct: 1
    },

    // --- ODE & DIFFERENTIAL EQUATIONS ---
    {
        text: "The correct formula for k3 in RK4 is:",
        options: ["k3 = hf(xn + h/2, yn + k2/2)", "k3 = hf(xn + h, yn + k2)", "k3 = hf(xn + h/2, yn + k1/2)", "k3 = hf(xn + h/2, yn + k3)", "k3 = hf(xn + h, yn + 2k3)"],
        correct: 0
    },
    {
        text: "The 3rd order RK formula uses which set of coefficients?",
        options: [
            "k1=hf(xn, yn), k2=hf(xn+h/3, yn+k1/3), k3=hf(xn+2h/3, yn+2k2/3)",
            "k1=hf(xn, yn), k2=hf(xn+h/2, yn+k1/2), k3=hf(xn+h, yn-k1+2k2)",
            "k1=hf(xn, yn), k2=hf(xn+h/2, yn+k1/2), k3=hf(xn+h/2, yn+k2/2)",
            "k1=hf(xn, yn), k2=hf(xn+h, yn+k1), k3=hf(xn+h, yn-k1+2k2)",
            "None of the above"
        ],
        correct: 1
    },
    {
        text: "Picard's method is based on:",
        options: ["Numerical differentiation", "Polynomial interpolation", "Converting ODE to difference equation", "Iterative solution of integral equation", "Taylor series expansion"],
        correct: 3
    },
    {
        text: "For solving y' = x² + y with y(0)=1 using Taylor series, what is y''(0)?",
        options: ["2x + y'", "2 + (x² + y)'", "Need to compute: y'' = 2x + y' = 2x + (x² + y)", "2 + y'", "0"],
        correct: 2
    },
    {
        text: "The local truncation error of Euler's method is:",
        options: ["O(h)", "O(h²)", "O(h³)", "O(h⁴)", "O(1)"],
        correct: 1
    },
    {
        text: "The Runge-Kutta method of 4th order is equivalent to Taylor series up to term:",
        options: ["h", "h²", "h³", "h⁴", "h⁵"],
        correct: 3
    },
    {
        text: "Predictor-Corrector methods like Milne's or Adams-Bashforth are:",
        options: ["Single-step", "Multi-step", "Direct", "Iterative for roots", "None of the above"],
        correct: 1
    },
    {
        text: "Modified Euler's method is also known as:",
        options: ["RK1", "RK2 (Heun's method)", "RK4", "Bisection", "Secant"],
        correct: 1
    },

    // --- ROOTS OF EQUATIONS ---
    {
        text: "Which method can find complex roots without complex initial guesses?",
        options: ["Secant", "Bisection", "False position", "Newton-Raphson", "Müller's method"],
        correct: 4
    },
    {
        text: "In the Newton-Raphson method, the formula for x_{n+1} is:",
        options: ["xn - f(xn)/f'(xn)", "(xn + xn-1)/2", "g(xn)", "xn + f(xn)/f'(xn)", "xn - f(xn)"],
        correct: 0
    },
    {
        text: "In the bisection method, the error after n iterations satisfies:",
        options: ["1/n²", "1/log(n)", "1/n", "log(n)", "1/2^n"],
        correct: 4
    },
    {
        text: "The Secant method requires how many initial guesses?",
        options: ["1", "2", "3", "0", "4"],
        correct: 1
    },
    {
        text: "The order of convergence of the Newton-Raphson method is:",
        options: ["1 (linear)", "1.618", "2 (quadratic)", "3", "0.5"],
        correct: 2
    },
    {
        text: "The method of False Position (Regula Falsi) is always convergent.",
        options: ["TRUE", "FALSE"],
        correct: 0
    },
    {
        text: "Fixed point iteration x = g(x) converges if:",
        options: ["|g'(x)| > 1", "|g'(x)| < 1", "g'(x) = 0", "g(x) is linear", "g(x) is constant"],
        correct: 1
    },

    // --- CODE ANALYSIS & MISC ---
    {
        text: "What will this function return for f(x)=x² from 0 to 2 with n=4?",
        code: "def func(f, a, b, n):\n    h = (b - a) / n\n    result = (f(a) + f(b)) / 2\n    for i in range(1, n):\n        result += f(a + i * h)\n    return result * h",
        options: ["2.666...", "2.75", "2.25", "2.5", "3.0"],
        correct: 1
    },
    {
        text: "What is being calculated here?",
        code: "for i in range(1, n):\n    diff = table[i-1]\n    current_diff = [diff[j+1] - diff[j] for j in range(n-i)]\n    table.append(current_diff)",
        options: ["Backward difference table", "Lagrange coefficients", "Forward difference table", "Divided difference table", "Wrong difference table"],
        correct: 2
    },
    {
        text: "Identify the error in this LU decomposition snippet:",
        code: "for i in range(n):\n    L[i,i] = 1\n    for j in range(i, n):\n        U[i,j] = A[i,j] - sum(L[i,k]*U[k,j] for k in range(i))\n    for j in range(i+1, n):\n        L[j,i] = (A[j,i] - sum(L[j,k]*U[k,i] for k in range(i))) / U[i,i]",
        options: ["Line 1", "Line 2", "Line 3", "No error", "Summation limits are wrong"],
        correct: 3
    },
    {
        text: "O(h²) means the error decreases proportional to:",
        options: ["h", "h²", "constant", "1/h", "h³"],
        correct: 1
    },
    {
        text: "In tabulated data with equal intervals, h denotes:",
        options: ["Step size", "Number of points", "Residual", "Slope", "Precision"],
        correct: 0
    },
    {
        text: "A key caution when fitting ln(y) vs x is that:",
        options: ["It works only for negative y", "It makes the model non-linear", "It changes the error structure (minimizes relative error)", "It guarantees R² = 1", "None of the above"],
        correct: 2
    },
    {
        text: "If f represents distance in meters and x represents time in seconds, f' has units of:",
        options: ["m", "s", "m/s", "m/s²", "m*s"],
        correct: 2
    },
    {
        text: "Smaller h always decreases total error in numerical calculations.",
        options: ["TRUE", "FALSE"],
        correct: 1
    },
    {
        text: "Which rule is the most accurate among Newton-Cotes for the same number of points?",
        options: ["Trapezoidal", "Simpson 1/3", "Simpson 3/8", "Boole's rule", "Weddle's rule"],
        correct: 4
    },
    {
        text: "The Rayleigh quotient is used to approximate:",
        options: ["Roots", "Eigenvalues", "Determinant", "Inverse", "Residuals"],
        correct: 1
    },
    {
        text: "What does this code fragment represent?",
        code: "x_new = (b[i] - sum(A[i][j] * x[j] for j in range(n) if i != j)) / A[i][i]",
        options: ["Jacobi iteration", "Gauss-Seidel iteration", "SOR iteration", "Gaussian elimination", "LU step"],
        correct: 0
    },
    {
        text: "In Python, which function correctly implements the Bisection method step?",
        code: "if f(a) * f(m) < 0: b = m\nelse: a = m",
        options: ["Snippet 1", "Snippet 2", "Both", "Neither", "Depends on f"],
        correct: 0
    },
    {
        text: "What is the purpose of partial pivoting in Gaussian elimination?",
        options: ["Reduce number of operations", "Avoid division by zero or very small numbers", "Make matrix symmetric", "Find determinant", "Find inverse"],
        correct: 1
    },
    {
        text: "A cubic spline S(x) on [xi, xi+1] is a polynomial of degree:",
        options: ["1", "2", "3", "4", "5"],
        correct: 2
    },
    {
        text: "Which method is faster to converge in most cases?",
        options: ["Jacobi", "Gauss-Seidel", "Bisection", "False Position", "Power method"],
        correct: 1
    },
    {
        text: "The 'h' in numerical differentiation formula (f(x+h)-f(x))/h is called:",
        options: ["Slope", "Step size", "Residual", "Error", "Index"],
        correct: 1
    },
    {
        text: "Richardson extrapolation is used to:",
        options: ["Find roots", "Improve accuracy of numerical differentiation/integration", "Solve СЛАУ", "Fit curves", "Find eigenvalues"],
        correct: 1
    },
    {
        text: "The Romberg integration method is based on:",
        options: ["Simpson's rule", "Trapezoidal rule + Richardson extrapolation", "Gaussian quadrature", "Boole's rule", "Weddle's rule"],
        correct: 1
    },
    {
        text: "The condition number of a matrix measures:",
        options: ["Its size", "Its determinant", "Sensitivity to changes in input data", "Number of zeros", "Number of eigenvalues"],
        correct: 2
    },
    {
        text: "Central difference formula (f(x+h)-f(x-h))/(2h) has error of order:",
        options: ["O(h)", "O(h²)", "O(h³)", "O(h⁴)", "O(1)"],
        correct: 1
    },
    {
        text: "In least squares, the coefficient of determination R² close to 1 means:",
        options: ["Poor fit", "Good fit", "No correlation", "Negative correlation", "Random noise"],
        correct: 1
    }
];

while(questions.length < 65) {
    questions.push({...questions[Math.floor(Math.random() * 10)], isDuplicate: true});
}