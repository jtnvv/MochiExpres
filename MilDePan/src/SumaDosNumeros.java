public class SumaDosNumeros {
    public static void main(String[] args) {
        int numero1 = 5;
        int numero2 = 7;
        int resultado = suma(numero1, numero2);
        System.out.println("La suma de " + numero1 + " y " + numero2 + " es igual a " + resultado);
    }

    // Función que suma dos números enteros y devuelve el resultado
    public static int suma(int a, int b) {
        return a + b;
    }
}
