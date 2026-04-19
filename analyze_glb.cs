using System;
using System.IO;
using System.Linq;

public class Program {
    public static void Main() {
        byte[] data = File.ReadAllBytes("public/models/spiderman.glb");
        Console.WriteLine("File size: " + data.Length);
        // Find GLB header
        if (data[0] == 0x67 && data[1] == 0x6C && data[2] == 0x54 && data[3] == 0x46) {
            Console.WriteLine("Valid GLB header found.");
        }
    }
}
