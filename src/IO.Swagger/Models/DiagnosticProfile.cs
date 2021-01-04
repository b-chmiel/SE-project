/*
 * Car Workshop
 *
 * <h2> WILL BE UPDATED!</h2></br><b>Incomplete</b> API for car workshop system (lacks employees and parts management).</br><a href=\"https://app.swaggerhub.com/apis/soft_eng/project/0.1.1\">Swagger project (contains models)</a>.
 *
 * OpenAPI spec version: 0.1.1
 * Contact: k.baciejowski@gmail.com
 * Generated by: https://github.com/swagger-api/swagger-codegen.git
 */

using System;
using System.Linq;
using System.IO;
using System.Text;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace IO.Swagger.Models
{ 
    /// <summary>
    /// 
    /// </summary>
    [DataContract]
    public partial class DiagnosticProfile : IEquatable<DiagnosticProfile>
    { 
        /// <summary>
        /// Gets or Sets Engine
        /// </summary>
        [DataMember(Name="engine")]
        public string Engine { get; set; }

        /// <summary>
        /// Gets or Sets Body
        /// </summary>
        [DataMember(Name="body")]
        public string Body { get; set; }

        /// <summary>
        /// Gets or Sets LowVoltage
        /// </summary>
        [DataMember(Name="lowVoltage")]
        public string LowVoltage { get; set; }

        /// <summary>
        /// Gets or Sets Lighting
        /// </summary>
        [DataMember(Name="lighting")]
        public string Lighting { get; set; }

        /// <summary>
        /// Gets or Sets Brakes
        /// </summary>
        [DataMember(Name="brakes")]
        public string Brakes { get; set; }

        /// <summary>
        /// Gets or Sets Sensors
        /// </summary>
        [DataMember(Name="sensors")]
        public string Sensors { get; set; }

        /// <summary>
        /// Gets or Sets Miscellaneous
        /// </summary>
        [DataMember(Name="miscellaneous")]
        public List<string> Miscellaneous { get; set; }

        /// <summary>
        /// Gets or Sets Conditionig
        /// </summary>
        [DataMember(Name="conditionig")]
        public string Conditionig { get; set; }

        /// <summary>
        /// Returns the string presentation of the object
        /// </summary>
        /// <returns>String presentation of the object</returns>
        public override string ToString()
        {
            var sb = new StringBuilder();
            sb.Append("class DiagnosticProfile {\n");
            sb.Append("  Engine: ").Append(Engine).Append("\n");
            sb.Append("  Body: ").Append(Body).Append("\n");
            sb.Append("  LowVoltage: ").Append(LowVoltage).Append("\n");
            sb.Append("  Lighting: ").Append(Lighting).Append("\n");
            sb.Append("  Brakes: ").Append(Brakes).Append("\n");
            sb.Append("  Sensors: ").Append(Sensors).Append("\n");
            sb.Append("  Miscellaneous: ").Append(Miscellaneous).Append("\n");
            sb.Append("  Conditionig: ").Append(Conditionig).Append("\n");
            sb.Append("}\n");
            return sb.ToString();
        }

        /// <summary>
        /// Returns the JSON string presentation of the object
        /// </summary>
        /// <returns>JSON string presentation of the object</returns>
        public string ToJson()
        {
            return JsonConvert.SerializeObject(this, Formatting.Indented);
        }

        /// <summary>
        /// Returns true if objects are equal
        /// </summary>
        /// <param name="obj">Object to be compared</param>
        /// <returns>Boolean</returns>
        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            return obj.GetType() == GetType() && Equals((DiagnosticProfile)obj);
        }

        /// <summary>
        /// Returns true if DiagnosticProfile instances are equal
        /// </summary>
        /// <param name="other">Instance of DiagnosticProfile to be compared</param>
        /// <returns>Boolean</returns>
        public bool Equals(DiagnosticProfile other)
        {
            if (ReferenceEquals(null, other)) return false;
            if (ReferenceEquals(this, other)) return true;

            return 
                (
                    Engine == other.Engine ||
                    Engine != null &&
                    Engine.Equals(other.Engine)
                ) && 
                (
                    Body == other.Body ||
                    Body != null &&
                    Body.Equals(other.Body)
                ) && 
                (
                    LowVoltage == other.LowVoltage ||
                    LowVoltage != null &&
                    LowVoltage.Equals(other.LowVoltage)
                ) && 
                (
                    Lighting == other.Lighting ||
                    Lighting != null &&
                    Lighting.Equals(other.Lighting)
                ) && 
                (
                    Brakes == other.Brakes ||
                    Brakes != null &&
                    Brakes.Equals(other.Brakes)
                ) && 
                (
                    Sensors == other.Sensors ||
                    Sensors != null &&
                    Sensors.Equals(other.Sensors)
                ) && 
                (
                    Miscellaneous == other.Miscellaneous ||
                    Miscellaneous != null &&
                    Miscellaneous.SequenceEqual(other.Miscellaneous)
                ) && 
                (
                    Conditionig == other.Conditionig ||
                    Conditionig != null &&
                    Conditionig.Equals(other.Conditionig)
                );
        }

        /// <summary>
        /// Gets the hash code
        /// </summary>
        /// <returns>Hash code</returns>
        public override int GetHashCode()
        {
            unchecked // Overflow is fine, just wrap
            {
                var hashCode = 41;
                // Suitable nullity checks etc, of course :)
                    if (Engine != null)
                    hashCode = hashCode * 59 + Engine.GetHashCode();
                    if (Body != null)
                    hashCode = hashCode * 59 + Body.GetHashCode();
                    if (LowVoltage != null)
                    hashCode = hashCode * 59 + LowVoltage.GetHashCode();
                    if (Lighting != null)
                    hashCode = hashCode * 59 + Lighting.GetHashCode();
                    if (Brakes != null)
                    hashCode = hashCode * 59 + Brakes.GetHashCode();
                    if (Sensors != null)
                    hashCode = hashCode * 59 + Sensors.GetHashCode();
                    if (Miscellaneous != null)
                    hashCode = hashCode * 59 + Miscellaneous.GetHashCode();
                    if (Conditionig != null)
                    hashCode = hashCode * 59 + Conditionig.GetHashCode();
                return hashCode;
            }
        }

        #region Operators
        #pragma warning disable 1591

        public static bool operator ==(DiagnosticProfile left, DiagnosticProfile right)
        {
            return Equals(left, right);
        }

        public static bool operator !=(DiagnosticProfile left, DiagnosticProfile right)
        {
            return !Equals(left, right);
        }

        #pragma warning restore 1591
        #endregion Operators
    }
}
