using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Asset.Services
{
    public static class Anagram
    {
        public static bool areAnagram(this string value, string firstString)
        {
            if (firstString.Length != value.Length)
            {
                return false;
            }
            char[] firstCharsArray = firstString.ToLower().ToCharArray();
            char[] secondCharsArray = value.ToLower().ToCharArray();
            Array.Sort(firstCharsArray);
            Array.Sort(secondCharsArray);
            for (int i = 0; i < firstCharsArray.Length; i++)
            {
                if (firstCharsArray[i].ToString() != secondCharsArray[i].ToString())
                {
                    return false;
                }
            }
            return true;
        }
    }
}
